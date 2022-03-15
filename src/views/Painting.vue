<template>
  <div class="container">
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
      id: '',
      product: {},
    };
  },
  methods: {
    getPainting() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product;
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
    this.id = this.$route.params.paintingId;
    this.getPainting();
  },
};
</script>
