<template>
  <div class="container">
    <div class="mt-4">
      <!-- 產品列表 -->
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
              <div class="h5">2022</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary">
                  <span
                    class="spinner-border spinner-grow-sm"
                    @click="getPainting(painting.id)"
                  ></span>
                  畫作細節
                </button>
                <button type="button" class="btn btn-outline-danger">
                  <span
                    class="spinner-border spinner-grow-sm"
                    @click="addToCollection(painting.id)"
                  ></span>
                  加到收藏
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button">清空購物車</button>
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
                <button type="button" class="btn btn-outline-danger btn-sm">
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
                {{ collection.product.content }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">數量</td>
            <td class="text-end">total</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">final_total</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">套用優惠碼</button>
        </div>
      </div>
    </div>

    <div class="my-5 row justify-content-center">
      <Form ref="form" class="col-md-6" v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
          ></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
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
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">給畫家的話</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10"></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger">送出收藏</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paintings: [],
      painting: {},
      collections: {},
    };
  },
  methods: {
    getPaintings() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.paintings = res.data.products;
        })
        .catch(() => {});
    },
    getPainting(id) {
      this.$router.push(`/painting/${id}`);
    },
    getCollections() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.collections = res.data.data;
        })
        .catch(() => {});
    },
    addToCollection(id, qty = 1) {
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
            // eslint-disable-next-line no-alert
            alert(`${this.product.title}已收藏`);
          }
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getPaintings();
    this.getCollections();
  },
};
</script>
