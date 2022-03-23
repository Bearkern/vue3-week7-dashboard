<template>
  <h1>收藏管理</h1>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>序號</th>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in collections" :key="index">
        <tr v-if="collections.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ index + 1 }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>
            <span v-if="item.user">{{ item.user.email }}</span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="collection in item.products" :key="collection.id">
                {{ collection.product.title }} 數量：{{ collection.qty }}
                {{ collection.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`${item.id}`"
                v-model="item.is_paid"
                @change="updatePayment(item)"
              />
              <label class="form-check-label" :for="`${item.id}`">
                <span v-if="`${item.is_paid}`">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openCollectionModal(item)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDeleteModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <div class="d-flex justify-content-center">
    <Pagination :pages="pagination" @emit-page="getCollections"></Pagination>
  </div>
  <CollectionModal
    ref="collectionModal"
    :collection="tempCollection"
    @update-payment="updatePayment"
  ></CollectionModal>
  <DeleteModal
    ref="deleteModal"
    :item="tempCollection"
    @delete-item="deleteCollection"
  ></DeleteModal>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import CollectionModal from '@/components/modals/CollectionModal.vue';
import DeleteModal from '@/components/modals/DeleteModal.vue';

export default {
  data() {
    return {
      isLoading: false,
      collections: [],
      pagination: {},
      tempCollection: {},
    };
  },
  components: {
    Pagination,
    CollectionModal,
    DeleteModal,
  },
  methods: {
    getCollections(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.collections = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    updatePayment(item) {
      this.isLoading = true;

      const payment = {
        is_paid: item.is_paid,
      };

      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`, {
          data: payment,
        })
        .then((res) => {
          this.getCollections(this.pagination.current_page);
          this.$refs.collectionModal.closeModal();
          this.isLoading = false;
          this.$httpMessageState(res);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response);
        });
    },
    openCollectionModal(item) {
      this.tempCollection = { ...item };
      this.$refs.collectionModal.openModal();
    },
    openDeleteModal(item) {
      this.tempCollection = { ...item };
      this.$refs.deleteModal.openModal();
    },
    deleteCollection(itemId) {
      this.isLoading = true;
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${itemId}`)
        .then((res) => {
          this.getCollections(this.pagination.current_page);
          this.$refs.deleteModal.closeModal();
          this.isLoading = false;
          this.$httpMessageState(res, '刪除收藏');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '刪除收藏');
        });
    },
  },
  mounted() {
    this.getCollections();
  },
};
</script>
