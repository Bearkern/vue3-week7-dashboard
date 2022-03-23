<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <ToastMessage></ToastMessage>
      <router-link class="navbar-brand" to="/admin">畫作管理</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/collections">收藏管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/posts">貼文</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">回前台</router-link>
          </li>
        </ul>
        <button class="btn btn-primary" @click="logout">登出</button>
      </div>
    </div>
  </nav>
</template>

<script>
import ToastMessage from '@/components/ToastMessage.vue';

export default {
  components: {
    ToastMessage,
  },
  methods: {
    logout() {
      this.$http.post(`${process.env.VUE_APP_API}/logout`)
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '登出');
        });
    },
  },
};
</script>
