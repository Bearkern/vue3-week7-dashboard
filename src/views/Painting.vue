<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/collections">畫作收藏</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" class="img-fluid mb-3" />
      </article>
      <div class="col-4">
        <div class="h5">畫作年份：</div>
        <hr />
        <button type="button" class="btn btn-outline-danger" @click="addToCollection(product.id)">
          加入收藏
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      id: '',
      product: {},
    };
  },
  methods: {
    getPainting() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
        })
        .catch((res) => {
          this.isLoading = false;
          this.$httpMessageState(res.response, '錯誤訊息');
        });
    },
    addToCollection(id, qty = 1) {
      this.isLoading = true;

      const collection = {
        product_id: id,
        qty,
      };

      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data: collection,
        })
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, '加入收藏');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err, '加入收藏');
        });
    },
  },
  mounted() {
    this.id = this.$route.params.paintingId;
    this.getPainting();
  },
};
</script>
