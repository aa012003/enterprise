<script setup>
import Cookies from 'js-cookie'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
//選擇欄
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

//吐司
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
//router
const router = useRouter()
const route = useRoute()

const id = route.params.id
const data = ref()
const sign = ref()
const token = ref('')
const VITE_URL = import.meta.env.VITE_PATH

onMounted(() => {
  token.value = Cookies.get('jwt')
  axios({
    method: 'get',
    url: `${VITE_URL}/enterprise_signature/${id}`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      data.value = res.data.data
      // console.log(data)
    })
    .catch((err) => {
      console.log(err)
      alert(err.message)
    })

  axios({
    method: 'get',
    url: `${VITE_URL}/enterprise_signature/${id}/upload_file`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      // console.log('res', res)
      sign.value = res.data.data.list[0].url
      console.log(sign.value)
    })
    .catch((err) => {
      console.log(err)
    })
})

const deleteOrder = () => {
  confirm.require({
    message: '確定要刪除嗎?',
    header: '警告',
    icon: 'pi pi-info-circle',
    rejectLabel: '取消',
    acceptLabel: '刪除',
    rejectClass: 'p-button-primary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      axios({
        method: 'delete',
        url: `${VITE_URL}/enterprise_signature/${id}`,
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
          router.push('/orderlist')
        })
        .catch((err) => {
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
  label: '簽單管理',
  route: '/orderlist'
})
const items = ref([{ label: '簽單檢視', route: '/ordercheck/${id}' }])
</script>

<template>
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
  <div class="col-12">
    <div class="grid p-fluid">
      <div class="col">
        <div class="card">
          <div class="p-fluid grid">
            <div class="col-12 md:col-6">
              <div class="field">
                <div class="row">
                  <label for="getOffTime">下車時間</label>
                </div>
                <div v-if="data && data.offAddress">{{ data.offAddress }}</div>
              </div>
              <div class="field">
                <div class="row">
                  <label for="department">單位部門</label>
                </div>
                <div v-if="data">{{ data.onAddress }}</div>
              </div>
              <div class="field">
                <div class="row">
                  <label for="name">姓名</label>
                </div>
                <div v-if="data">{{ data.employee.name }}</div>
              </div>
              <div class="field">
                <div class="row">
                  <label for="Total">總金額</label>
                </div>
                <div v-if="data">{{ data.actualFee }}</div>
              </div>
              <div class="field">
                <div class="row">
                  <label for="orderNotes">簽單備註</label>
                </div>
                <div v-if="data">{{ data.signingNote }}</div>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="field">
                <div class="row">
                  <label for="pickUpLocation">上車地點</label>
                </div>
                <div v-if="data">{{ data.onAddress }}</div>
              </div>
              <div class="field">
                <div class="row">
                  <label for="dropOffLocation">下車地點</label>
                </div>
                <div v-if="data">{{ data.offAddress }}</div>
              </div>
              <!-- <div class="field">
                <div class="row">
                  <label for="factoryArea">廠區</label>
                </div>
                <div id="factoryArea">{{  }}</div>
              </div> -->
              <div class="field">
                <div class="row">
                  <label for="jobNumber">工號</label>
                </div>
                <div v-if="data">{{ data.employeeJobNumber }}{{ data.employee.name }}</div>
              </div>
              <div class="field">
                <div class="row">
                  <label for="passengerNotes">乘客備註</label>
                </div>
                <div v-if="data">{{ data.passengerNote }}</div>
              </div>
            </div>
            <div class="col-12 md:col-12">
              <div class="field">
                <div class="row">
                  <label for="passengerSign">乘客簽名</label>
                </div>
                <img v-if="sign" :src="sign" alt="簽名" />
                <span v-else style="color: red">沒有簽名</span>
              </div>
            </div>
            <Button
              type="button"
              label="刪除簽單"
              class="m-1"
              severity="danger"
              outlined
              @click="deleteOrder"
            />
            <router-link to="/orderlist" class="w-full">
              <Button type="submit" label="返回" class="m-1" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.row {
  background-color: #ececec;
  margin-bottom: 8px;
}
</style>
