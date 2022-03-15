<template>
  <h2>登入後台頁面</h2>
  <div class="container mt-5">
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" v-slot="{ errors }" @submit="login">
        <div class="mb-2">
          <label for="email" class="form-label">帳號</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="user.username"
          ></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-2">
          <label for="password" class="form-label">密碼</label>
          <Field
            id="password"
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors['password'] }"
            placeholder="請輸入密碼"
            rules="required"
            v-model="user.password"
          ></Field>
          <ErrorMessage name="password" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="text-end">
          <button type="submit" class="btn btn-primary">登入</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

          this.$router.push('/admin');
        })
        .catch((err) => {
          console.dir(err.response.data.message);
        });
    },
  },
};
</script>
