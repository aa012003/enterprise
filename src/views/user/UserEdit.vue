<script setup>
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
//吐司
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
//選擇欄
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')

//router
const router = useRouter()
const route = useRoute()
const id = route.params.id
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
//下拉職業列表
const positionList = ref([{ name: String, id: Number }])
const position = ref([])
const handleChange = (event) => {
  formData.value.position.id = event.value.id
}
onMounted(() => {
  token.value = Cookies.get('jwt')

  //取得下拉職位列表
  axios({
    method: 'get',
    url: `${VITE_URL}/company_user_position`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      positionList.value = res.data.data.list
      position.value = positionList.value
    })
    .catch((err) => {
      console.log(err)
    })
  //取得表單資料
  axios({
    method: 'get',
    url: `${VITE_URL}/company_user/${id}`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      formData.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
})

//更新使用者
const updateUser = () => {
  console.log(formData.value)
  token.value = Cookies.get('jwt')
  confirm.require({
    message: '確定更新資料嗎?',
    header: '提示',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-primary p-button-outlined',
    rejectLabel: '取消',
    acceptLabel: '確定',
    accept: () => {
      axios({
        method: 'patch',
        url: `${VITE_URL}/company_user/${id}`,
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        data: formData.value
      })
        .then((res) => {
          // console.log('update', formData.value)
          toast.add({
            severity: 'success',
            summary: '提示',
            detail: '已更新',
            life: 3000
          })

          router.push('/userlist')
        })
        .catch((err) => {
          console.log('err', err)
          toast.add({
            severity: 'error',
            summary: '警告',
            detail: err.message,
            life: 3000
          })
        })
    }
  })
}
//刪除使用者
const deleteUser = () => {
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
        url: `${VITE_URL}/company_user/${id}`,
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
          router.push('/userlist')
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
  label: '使用者管理',
  route: '/userlist'
})
const items = ref([{ label: '編輯使用者', route: '/useredit/:id' }])
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
        <form @submit.prevent="updateUser">
          <div class="card">
            <div class="p-fluid grid">
              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="name">姓名</label>
                  <InputText v-model="formData.name" type="text" />
                </div>
                <div class="field">
                  <label for="password">帳號</label>
                  <InputText v-model="formData.account" />
                </div>
              </div>

              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="position">職位</label>
                  <Dropdown
                    v-model="formData.position"
                    :options="position"
                    optionLabel="name"
                    placeholder="請選擇職位"
                    checkmark
                    :highlightOnSelect="false"
                    class="w-full md:w-14rem"
                    @change="handleChange"
                  />
                </div>
              </div>
              <Button
                type="button"
                label="刪除使用者"
                class="m-1"
                severity="danger"
                outlined
                @click="deleteUser"
              />
              <Button type="submit" label="儲存" class="m-1" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
