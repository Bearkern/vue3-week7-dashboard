<template>
  <div>
    <!-- <Loading :active="isLoading" :z-index="1060"></Loading> -->
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td>
            <span class="text-success">啟用</span>
            <span>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button">編輯</button>
              <button class="btn btn-outline-danger btn-sm" type="button">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination></Pagination>
    <!-- <PaintingModal></PaintingModal>
    <RemovePaintingModal></RemovePaintingModal> -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: true,
      Paintings: [],
    };
  },
  methods: {
    getPaintings() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products`)
        .then(() => {})
        .catch(() => {});
    },
  },
  components: {
    Pagination,
  },
  mounted() {
    this.getPaintings();
  },
};
</script>
