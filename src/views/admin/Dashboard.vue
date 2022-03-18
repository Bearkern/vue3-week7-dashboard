<template>
  <DashboardNavbar></DashboardNavbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessage></ToastMessage>
    <router-view v-if="loginStatus" />
  </div>
</template>

<script>
import DashboardNavbar from '@/components/DashboardNavbar.vue';
import emitter from '@/utilities/mitt';
import ToastMessage from '@/components/ToastMessage.vue';

export default {
  data() {
    return {
      loginStatus: false,
    };
  },
  components: {
    DashboardNavbar,
    ToastMessage,
  },
  provide() {
    return {
      emitter,
    };
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.$http
      .post(`${process.env.VUE_APP_API}/api/user/check`)
      .then((res) => {
        this.loginStatus = res.data.success;
      })
      .catch((err) => {
        console.log(err.response.data.message);
        this.$router.push('/login');
      });
  },
};
</script>
