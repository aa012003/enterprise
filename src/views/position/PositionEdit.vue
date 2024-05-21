<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'
//吐司
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
//選擇欄
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()
//router
const router = useRouter()
const route = useRoute()
const id = route.params.id

const token = ref('')
const VITE_URL = import.meta.env.VITE_PATH

//表單
const form = ref({
  name: ''
})

//職權選擇
const checked = ref(false)
const positionList = ref({})

onMounted(() => {
  token.value = Cookies.get('jwt')
  //取得表單資料
  axios({
    method: 'get',
    url: `${VITE_URL}/company_user_position/${id}`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      form.value = res.data.data
    })
    .catch((err) => {
      alert(err.message)
    })
})
//更新職位
const updatePosition = () => {
  axios({
    method: 'patch',
    url: `${VITE_URL}/company_user_position/${id}`,
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
      // console.log('update', form.value)
      router.push('/positionlist')
    })
    .catch((err) => {
      toast.add({
        severity: 'error',
        summary: '警告',
        detail: err.message,
        life: 3000
      })
      console.log('err', err)
    })
}
//刪除職位
const deletePosition = () => {
  confirm.require({
    message: '確定要刪除嗎?',
    header: '警告',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-primary p-button-outlined',
    acceptClass: 'p-button-danger',
    rejectLabel: '取消',
    acceptLabel: '刪除',
    accept: () => {
      axios({
        method: 'delete',
        url: `${VITE_URL}/company_user_position/${id}`,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
        .then((res) => {
          toast.add({
            severity: 'success',
            summary: '刪除成功',
            life: 3000
          })
          router.push('/positionlist')
        })
        .catch((err) => {
          console.log(err)
          toast.add({
            severity: 'error',
            summary: '警告',
            detail: '刪除失敗',
            life: 3000
          })
        })
    }
  })
}
//麵包屑
const home = ref({
  label: '職位管理',
  route: '/positionlist'
})
const items = ref([{ label: '編輯職位', route: '/positionedit/:id' }])
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
        <form @submit.prevent="updatePosition">
          <div class="card">
            <div class="field">
              <label>職位名稱</label>
              <InputText v-model="form.name" />
            </div>
            <div class="field mt-5 mb-5">
              <label for="password">權限</label>
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
            <Button
              type="button"
              label="刪除職位"
              class="m-1"
              severity="danger"
              outlined
              @click="deletePosition"
            />
            <Button type="submit" label="儲存" class="m-1" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
