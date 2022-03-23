<template>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openPaintingModal(true)">
        建立畫作
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">序號</th>
          <th width="120">分類</th>
          <th>畫作名稱</th>
          <th>畫作</th>
          <th width="120">年份</th>
          <th width="120">尺寸</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(painting, index) in paintings" :key="painting.id">
          <td>{{ index + 1 }}</td>
          <td>{{ painting.category }}</td>
          <td>{{ painting.title }}</td>
          <td><img :src="painting.imageUrl" style="height: 100px" alt="" /></td>
          <td>{{ painting.year }}</td>
          <td class="text-right">{{ painting.size }}</td>
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
                @click="openPaintingModal(false, painting)"
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
    <div class="d-flex justify-content-center">
      <Pagination :pages="pagination" @emit-page="getPaintings"></Pagination>
    </div>
    <PaintingModal
      ref="paintingModal"
      :painting="tempPainting"
      :isNew="isNew"
      @update-painting="updatePainting"
    ></PaintingModal>
    <DeleteModal
      ref="deleteModal"
      :item="tempPainting"
      @delete-item="deletePainting"
    ></DeleteModal>
  </div>
</template>

<script>
import PaintingModal from '@/components/modals/PaintingModal.vue';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      paintings: [],
      pagination: {},
      tempPainting: {},
      isNew: false,
    };
  },
  components: {
    PaintingModal,
    DeleteModal,
    Pagination,
  },
  methods: {
    getPaintings(page = 1) {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`,
        )
        .then((res) => {
          this.paintings = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    openPaintingModal(isNew, painting) {
      this.isNew = isNew;

      if (isNew) {
        this.tempPainting = {};
      } else {
        this.tempPainting = { ...painting };
      }

      this.$refs.paintingModal.openModal();
    },
    updatePainting(painting) {
      this.isLoading = true;
      this.tempPainting = painting;

      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/`;
      let httpMethod = 'post';
      let state = '新增畫作';

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${painting.id}`;
        httpMethod = 'put';
        state = '更新畫作';
      }

      this.$http[httpMethod](api, { data: this.tempPainting })
        .then((res) => {
          this.getPaintings(this.pagination.current_page);
          this.$refs.paintingModal.closeModal();
          this.isLoading = false;
          this.$httpMessageState(res, state);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response);
        });
    },
    openDeleteModal(painting) {
      this.tempPainting = { ...painting };
      this.$refs.deleteModal.openModal();
    },
    deletePainting(paintingId) {
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${paintingId}`)
        .then((res) => {
          this.getPaintings(this.pagination.current_page);
          this.isLoading = false;
          this.$httpMessageState(res, '刪除畫作');
          this.$refs.deleteModal.closeModal();
        })
        .catch((res) => {
          this.isLoading = false;
          this.$httpMessageState(res.response, '刪除畫作');
        });
    },
  },
  mounted() {
    this.getPaintings();
  },
};
</script>
