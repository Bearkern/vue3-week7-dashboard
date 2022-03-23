<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">部落格列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ article.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ article.title }}</h2>
        <p>
          <small class="text-muted">{{ $filters.date(article.create_at) }}</small> -
          <small class="text-muted">作者：{{ article.author }}</small>
        </p>
        <img alt="" class="img-fluid mb-3" :src="article.imageUrl"/>
        <div v-html="article.content"></div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      article: {},
      id: '',
    };
  },
  methods: {
    getArticle() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${this.id}`)
        .then((res) => {
          this.article = res.data.article;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    this.id = this.$route.params.articleId;
    this.getArticle();
  },
};
</script>
