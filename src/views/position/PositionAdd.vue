<script setup>
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

import * as yup from 'yup'

const token = ref('')
const VITE_URL = import.meta.env.VITE_PATH
//吐司
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
//router
const router = useRouter()
const route = useRoute()
//表單
const form = ref({
  name: ''
})
//職權選擇
const checked = ref(false)

//新增職位
const addPosition = () => {
  // console.log('form', form.value)
  token.value = Cookies.get('jwt')
  axios({
    method: 'post',
    url: `${VITE_URL}/company_user_position`,
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    data: form.value
  })
    .then((res) => {
      toast.add({
        severity: 'success',
        summary: '提示',
        detail: res.data.message,
        life: 3000
      })
      // console.log('add', res)
      router.push('/positionlist')
    })
    .catch((err) => {
      toast.add({
        severity: 'error',
        summary: '警告',
        detail: err.message,
        life: 3000
      })
      console.log(err)
    })
}

//麵包屑
const home = ref({
  label: '職位管理',
  route: '/positionlist'
})
const items = ref([{ label: '新增職位', route: '/positionadd' }])
//驗證
const rules = yup.object().shape({
  name: yup.string().required()
})
</script>

<template>
  <div>
    <Toast />
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-color">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
    <div class="grid p-fluid">
      <div class="col">
        <Form :validation-schema="rules" ref="form">
          <div class="card">
            <label for="name" class="required-text whitespace-nowrap text-xl">職位名稱</label>
            <Field v-slot="{ field, errors }" name="name">
              <InputText
                v-model="form.name"
                v-bind="field"
                placeholder="請輸入職位名稱"
                :class="{ 'p-invalid': errors.length > 0 }"
                class="w-full"
              ></InputText>
            </Field>
            <!-- <div class="field">
              <label for="name">職位名稱</label>
              <InputText v-model="form.name" invalid />
            </div> -->
            <div class="field mt-5 mb-5">
              <label for="password" class="text-xl">權限</label>
              <div class="flex justify-content-around">
                <div>
                  <label class="mr-3">新增員工</label>
                  <InputSwitch v-model="checked" />
                </div>
                <div>
                  <label class="mr-3">編輯員工資料 </label>
                  <InputSwitch v-model="checked" />
                </div>
                <div>
                  <label class="mr-3">刪除員工</label>
                  <InputSwitch v-model="checked" />
                </div>
                <div>
                  <label class="mr-3">編輯企業簽單</label>
                  <InputSwitch v-model="checked" />
                </div>
              </div>
            </div>
            <Button label="儲存" class="m-1" @click="addPosition()" />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.required-text::after {
  content: '*';
  font-size: 20px;
  color: red;
  margin-left: 6px;
}
</style>
