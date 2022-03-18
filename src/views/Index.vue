<template>
  <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessage></ToastMessage>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ToastMessage from '@/components/ToastMessage.vue';

export default {
  components: {
    Navbar,
    ToastMessage,
  },
};
</script>
