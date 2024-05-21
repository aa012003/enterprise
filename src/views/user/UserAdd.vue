<script setup>
import { ref, onMounted, watch } from 'vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Password from 'primevue/password'
//驗證
import * as yup from 'yup'
//吐司
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
//選擇欄
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

const token = ref('')
const VITE_URL = import.meta.env.VITE_PATH
//router
const router = useRouter()
const route = useRoute()
//表單
const formData = ref({
  name: '',
  account: '',
  password: '',
  sealedTime: '2024-04-21T13:22:01.083Z',
  position: {
    id: ''
  }
})
//職位選單
const positionList = ref([{ name: String, id: Number }])
const selectedPosition = ref(null)
const position = ref([])
const handleChange = (event) => {
  console.log('event', event.value.id)
  formData.value.position.id = event.value.id
}
// watch(selectedPosition, (newValue) => {
//   if (newValue) {
//     form.value.position.id = newValue.id
//     console.log('form', form.value.position)
//   }
// })
//新增使用者
const useradd = () => {
  // console.log('form', formData.value)
  // token.value = Cookies.get('jwt')
  confirm.require({
    message: '確定新增使用者嗎?',
    header: '提示',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-primary p-button-outlined',
    rejectLabel: '取消',
    acceptLabel: '確定',
    accept: () => {
      axios({
        method: 'post',
        url: `${VITE_URL}/company_user`,
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        data: formData.value
      })
        .then((res) => {
          toast.add({
            severity: 'success',
            summary: '提示',
            detail: '已儲存',
            life: 3000
          })
          router.push('/userlist')
        })
        .catch((err) => {
          console.log(err.response.data.message)
          toast.add({
            severity: 'error',
            summary: '錯誤',
            detail: err.response.data.message,
            life: 3000
          })
        })
      // toast.add({
      //   severity: 'success',
      //   summary: '提示',
      //   detail: '已儲存',
      //   life: 3000
      // })
      // router.push('/userlist')
    }
  })
}
//取得職位列表
onMounted(() => {
  token.value = Cookies.get('jwt')
  axios({
    method: 'GET',
    url: `${VITE_URL}/company_user_position`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      positionList.value = res.data.data.list
      position.value = positionList.value
      // console.log(position)
    })
    .catch((err) => {
      console.log(err)
    })
})
//麵包屑
const home = ref({
  label: '使用者管理',
  route: '/userlist'
})
const items = ref([{ label: '新增使用者', route: '/useradd' }])

const show = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 })
}
//驗證
const rules = yup.object().shape({
  name: yup.string().required(),
  selectedPosition: yup.string().required(),
  account: yup.string().required(),
  password: yup.string().required().min(6)
})
</script>

<template>
  <div>
    <Toast />
    <ConfirmDialog style="min-width: 300px" class="text-2xl" />
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
        <Form ref="form" :validation-schema="rules">
          <div class="card">
            <div class="p-fluid grid">
              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="name" class="required-text whitespace-nowrap">姓名</label>
                  <Field v-slot="{ field, errors }" name="name">
                    <InputText
                      v-model="formData.name"
                      v-bind="field"
                      placeholder="請輸入名稱"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
                <div class="field">
                  <label for="account" class="required-text whitespace-nowrap">帳號</label>
                  <Field v-slot="{ field, errors }" name="account">
                    <InputText
                      v-model="formData.account"
                      v-bind="field"
                      placeholder="請輸入帳號"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
              </div>

              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="position">職位</label>
                  <Dropdown
                    v-model="selectedPosition"
                    :options="position"
                    optionLabel="name"
                    placeholder="請選擇職位"
                    checkmark
                    :highlightOnSelect="false"
                    class="w-full md:w-14rem"
                    @change="handleChange"
                  />
                </div>
                <div class="field">
                  <label for="password" class="required-text whitespace-nowrap">密碼</label>
                  <Field v-slot="{ field, errors }" name="password">
                    <Password
                      v-model="formData.password"
                      v-bind="field"
                      placeholder="請輸入六位數以上密碼"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></Password>
                  </Field>
                </div>
              </div>
              <Button type="submit" label="儲存" class="m-1" @click="useradd()" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
