<script>
import axios from 'axios'
import Cookies from 'js-cookie'
const VITE_URL = import.meta.env.VITE_PATH
export default {
  data() {
    return {
      data: {},
      user: {
        taxIdNumber: '',
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      // this.isLoading = true
      axios
        .post(`${VITE_URL}/auth/login`, this.user)
        .then((res) => {
          this.isLoading = false
          const token = res.data.data.token
          Cookies.set('jwt', `${token}`, { expires: 7, path: '' }) //7天过期
          this.$router.push('/stafflist')
        })
        .catch((err) => {
          alert(err.data.message)
          this.isLoading = false
        })
    }
  }
}
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">登入企業簽單系統</div>
          </div>
          <form id="form" class="form-signin" @submit.prevent="login">
            <InputGroup class="mt-3">
              <InputGroupAddon>
                <i class="pi pi-receipt"></i>
              </InputGroupAddon>
              <InputText v-model="user.taxIdNumber" placeholder="請輸入統編" />
            </InputGroup>

            <InputGroup class="mt-3">
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText v-model="user.account" placeholder="請輸入帳號" />
            </InputGroup>

            <InputGroup class="mt-3">
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <InputText v-model="user.password" placeholder="請輸入密碼" />
            </InputGroup>

            <div>
              <Button class="w-full mt-3 justify-content-center" type="submit">登入</Button>
            </div>
          </form>
        </div>
      </div>
      <footer class="mt-3">©2023 邯武科技有限公司v3.0.0</footer>
    </div>
  </div>
</template>
