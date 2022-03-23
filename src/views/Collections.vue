<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="mt-4">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>畫作</th>
            <th>畫作名稱</th>
            <th>年份</th>
            <th>功能</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="painting in paintings" :key="painting.id">
            <td style="width: 200px">
              <div
                style="height: 100px; background-size: cover; background-position: center"
                :style="{ backgroundImage: `url(${painting.imageUrl})` }"
              ></div>
            </td>
            <td>
              <a href="#" class="text-dark">{{ painting.title }}</a>
            </td>
            <td>
              <div class="h5">{{ painting.year }}</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  :disabled="state.paintingLoading === painting.id || !painting.is_enabled"
                  @click="getPainting(painting.id)"
                >
                  <span
                    class="spinner-border spinner-grow-sm"
                    v-if="state.paintingLoading === painting.id"
                  ></span>
                  畫作細節
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  :disabled="state.paintingLoading === painting.id || !painting.is_enabled"
                  @click="addToCollection(painting.id)"
                >
                  <span
                    class="spinner-border spinner-grow-sm"
                    v-if="state.paintingLoading === painting.id"
                  ></span>
                  加到收藏
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button" @click="removeCollections">
          清空收藏
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 110px">數量</th>
            <th>畫作大小</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="collection in collections.carts" :key="collection.id">
            <tr>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="state.paintingLoading === painting.id"
                  @click="removeCollection(collection.id)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                {{ collection.product.title }}
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model.number="collection.qty"
                  />
                  <div class="input-group-text">/ {{ collection.product.unit }}</div>
                </div>
              </td>
              <td>
                {{ collection.product.size }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="my-5 row justify-content-center">
      <Form ref="collectionForm" class="col-md-6" v-slot="{ errors }" @submit="sendCollections">
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            v-model="form.user.name"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            v-model="form.user.email"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
          ></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            v-model="form.user.tel"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10"
          ></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            v-model="form.user.address"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">給畫家的話</label>
          <Field
            name="message"
            id="message"
            class="form-control"
            v-model="form.message"
            cols="30"
            rows="10"
            as="textarea"
          ></Field>
        </div>
        <div class="text-end">
          <button class="btn btn-danger" type="submit" :disabled="!collections.carts.length">
            友誼收藏
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      paintings: [],
      painting: {},
      collections: {
        carts: [],
      },
      state: {
        paintingLoading: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getPaintings() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.paintings = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    getPainting(id) {
      this.$router.push(`/painting/${id}`);
    },
    getCollections() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.collections = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    addToCollection(id, qty = 1) {
      this.isLoading = true;
      this.state.paintingLoading = id;
      const collection = {
        product_id: id,
        qty,
      };
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data: collection,
        })
        .then((res) => {
          if (res.data.success) {
            this.getCollections();
            this.isLoading = false;
            this.state.paintingLoading = '';
            this.$httpMessageState(res, '收藏');
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.state.paintingLoading = '';
          this.$httpMessageState(err, '收藏');
        });
    },
    removeCollection(id) {
      this.isLoading = true;
      this.state.paintingLoading = id;
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          this.state.paintingLoading = '';
          this.getCollections();
          this.isLoading = false;
          this.$httpMessageState(res, '移除收藏品項');
        })
        .catch((err) => {
          this.state.paintingLoading = '';
          this.isLoading = false;
          this.$httpMessageState(err.response, '移除收藏品項');
        });
    },
    removeCollections() {
      this.isLoading = true;
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.getCollections();
          this.isLoading = false;
          this.$httpMessageState(res, '清空收藏');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '清空收藏');
        });
    },
    sendCollections() {
      this.isLoading = true;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, {
          data: this.form,
        })
        .then((res) => {
          this.$refs.collectionForm.resetForm();
          this.$router.push(`/checkCollections/${res.data.orderId}`);
          this.isLoading = false;
          this.$httpMessageState(res, '友誼收藏');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '友誼收藏');
        });
    },
  },
  mounted() {
    this.getPaintings();
    this.getCollections();
  },
};
</script>
