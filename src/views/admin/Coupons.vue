<template>
  <h1>優惠券管理</h1>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }} %</td>
          <td>{{ $filters.date(coupon.due_date) }}</td>
          <td>
            <span v-if="coupon.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, coupon)"
              >
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(coupon)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <Pagination :pages="pagination" @emit-page="getCoupons"></Pagination>
    </div>

    <CouponModal
      :coupon="tempCoupon"
      @update-coupon="updateCoupon"
      ref="couponModal"
      :isNew="isNew"
    ></CouponModal>
    <DeleteModal
      :item="tempCoupon"
      @delete-item="deleteCoupon"
      ref="deleteModal"
    ></DeleteModal>
  </div>
</template>

<script>
import CouponModal from '@/components/modals/CouponModal.vue';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: true,
    };
  },
  components: {
    CouponModal,
    DeleteModal,
    Pagination,
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    openCouponModal(isNew, coupon) {
      this.isNew = isNew;

      if (isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0,
        };
      } else {
        this.tempCoupon = { ...coupon };
      }
      this.$refs.couponModal.openModal();
    },
    updateCoupon(coupon) {
      this.isLoading = true;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      let state = '新增優惠券';

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
        httpMethod = 'put';
        state = '更新優惠券';
      }
      this.$http[httpMethod](api, { data: coupon })
        .then((res) => {
          this.getCoupons();
          this.$refs.couponModal.closeModal();
          this.isLoading = false;
          this.$httpMessageState(res, state);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, state);
        });
    },
    openDeleteModal(coupon) {
      this.tempCoupon = coupon;
      this.$refs.deleteModal.openModal();
    },
    deleteCoupon(couponId) {
      this.isLoading = true;

      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${couponId}`)
        .then((res) => {
          this.getCoupons();
          this.$refs.deleteModal.closeModal();
          this.isLoading = false;
          this.$httpMessageState(res, '刪除優惠券');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '刪除優惠券');
        });
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
