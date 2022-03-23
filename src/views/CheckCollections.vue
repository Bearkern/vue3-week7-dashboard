<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="my-5 row justify-content-center">
    <h1>預約收藏</h1>
    <form class="col-md-6" @submit.prevent="makeAppointment">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>畫作名稱</th>
            <th>年份</th>
            <th>單位</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="painting in appointment.products" :key="painting">
            <td>{{ painting.product.title }}</td>
            <td>{{ painting.product.year }}</td>
            <td>{{ painting.qty }} / {{ painting.product.unit }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總數量</td>
            <td class="text-end">{{ quantity }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ appointment.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ appointment.user.name }}</td>
          </tr>
          <tr>
            <th>電話</th>
            <td>{{ appointment.user.tel }}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td>{{ appointment.user.address }}</td>
          </tr>
          <tr>
            <th>預約狀態</th>
            <td>
              <span v-if="!appointment.is_paid">尚未預約</span>
              <span v-else class="text-success">預約完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="appointment.is_paid === false">
        <button class="btn btn-danger" type="submit">確認預約畫作</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      collectionId: '',
      appointment: {
        user: {},
      },
      products: [],
      quantity: 0,
    };
  },
  methods: {
    getAppointment() {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.collectionId}`,
        )
        .then((res) => {
          this.appointment = res.data.order;
          this.products = Object.values(res.data.order.products);
          this.quantity = this.products.reduce((acc, cur) => acc + cur.qty, 0);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    makeAppointment() {
      this.isLoading = true;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.appointment.id}`,
        )
        .then((res) => {
          console.log(res);
          this.getAppointment();
          this.isLoading = false;
          this.$httpMessageState(res, '預約畫作');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '預約畫作');
        });
    },
  },
  mounted() {
    this.collectionId = this.$route.params.collectionId;
    this.getAppointment();
  },
};
</script>
