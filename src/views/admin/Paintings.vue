<template>
  <div>
    <!-- <Loading :active="isLoading" :z-index="1060"></Loading> -->
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openPaintingModal('create')">
        建立畫作
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">年份</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="painting in paintings" :key="painting.id">
          <td>{{ painting.category }}</td>
          <td>{{ painting.title }}</td>
          <td>{{ painting.year }}</td>
          <td class="text-right">{{ painting.origin_price }}</td>
          <td class="text-right">{{ painting.price }}</td>
          <td>
            <span v-if="painting.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openPaintingModal('edit', painting)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDeleteModal(painting)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination></Pagination>
    <PaintingModal
      ref="paintingModal"
      :painting="tempPainting"
      :isNew="isNew"
      @update-painting="updatePainting"
    ></PaintingModal>
    <DeleteModal ref="deleteModal" :painting="tempPainting"></DeleteModal>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import PaintingModal from '@/components/modals/PaintingModal.vue';
import DeleteModal from '@/components/modals/deleteModal.vue';

export default {
  data() {
    return {
      paintings: [],
      pagination: {},
      tempPainting: {},
      isNew: false,
    };
  },
  methods: {
    getPaintings() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products`)
        .then((res) => {
          this.paintings = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    openPaintingModal(modalOption, painting) {
      if (modalOption === 'create') {
        this.tempPainting = {};
        this.isNew = true;
      } else {
        this.tempPainting = { ...painting };
        this.isNew = false;
      }
      this.$refs.paintingModal.openModal();
    },
    openDeleteModal(painting) {
      this.tempPainting = { ...painting };
      this.$refs.deleteModal.openModal();
    },
    updatePainting(painting) {
      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API}/admin/product/${painting.id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Pagination,
    PaintingModal,
    DeleteModal,
  },
  mounted() {
    this.getPaintings();
  },
};
</script>
