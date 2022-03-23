<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>收藏資訊</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>收藏者</h3>
              <table class="table">
                <tbody v-if="tempCollection.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempCollection.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempCollection.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempCollection.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempCollection.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempCollection.id }}</td>
                  </tr>
                  <tr>
                    <th>收藏時間</th>
                    <td>{{ $filters.date(tempCollection.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempCollection.paid_date">
                        {{ $filters.date(tempCollection.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong class="text-success" v-if="tempCollection.is_paid">已付款</strong>
                      <span class="text-muted" v-else>尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.currency(tempCollection.total) }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="painting in tempCollection.products" :key="painting.id">
                    <th>{{ painting.product.title }}</th>
                    <td>{{ painting.qty }} / {{ painting.product.unit }}</td>
                    <td class="text-end">{{ $filters.currency(painting.final_total) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCollection.is_paid"
                    id="collectionPayment"
                  />
                  <label class="form-check-label" for="collectionPayment">
                    <span v-if="tempCollection.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-payment', tempCollection)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      tempCollection: {},
    };
  },
  props: {
    collection: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mixins: [modalMixin],
  watch: {
    collection() {
      this.tempCollection = this.collection;
    },
  },
};
</script>
