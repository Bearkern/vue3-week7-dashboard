<template>
  <Navbar></Navbar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessage></ToastMessage>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import emitter from '@/utilities/mitt';
import ToastMessage from '@/components/ToastMessage.vue';

export default {
  provide() {
    return {
      emitter,
    };
  },
  components: {
    Navbar,
    ToastMessage,
  },
};
</script>
