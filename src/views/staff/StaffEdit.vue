<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import Password from 'primevue/password'
import { useRoute, useRouter } from 'vue-router'
//選擇欄
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

//吐司
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')

//router
const router = useRouter()
const route = useRoute()
const id = route.params.id
//Switch
const payLimitSwitch = ref(false)
const rideLimitSwitch = ref(false)
//表單
const formData = ref({
  name: '',
  department: '',
  phone: '',
  factoryArea: '',
  takingLimit: 0,
  payLimit: 0,
  jobNumber: '',
  payPassword: '',
  email: '',
  authorize: false,
  note: '',
  sealedTime: '',
  monthlyLimit: 0,
  verificationCode: '0000',
  hasSignature: false
})
//取得員工
onMounted(() => {
  token.value = Cookies.get('jwt')
  axios({
    method: 'get',
    url: `${VITE_URL}/employee/${id}`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      // console.log(res)
      const data = res.data.data
      data.sealedTime = new Date(data.sealedTime).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      })
      formData.value = data
      // console.log('formData', formData.value)
    })
    .catch((err) => {
      toast.add({ severity: 'error', summary: '錯誤', life: 3000 })
      console.log(err)
    })
})

//更新員工
const updateStaff = () => {
  confirm.require({
    message: '確定要更新資料嗎?',
    header: '提示',
    icon: 'pi pi-info-circle',
    rejectLabel: '取消',
    acceptLabel: '確定',
    rejectClass: 'p-button-primary p-button-outlined',
    acceptClass: 'p-button-primary',
    accept: () => {
      formData.value.sealedTime = new Date(formData.value.sealedTime)
      axios({
        method: 'patch',
        url: `${VITE_URL}/employee/${id}`,
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        data: formData.value
      })
        .then((res) => {
          console.log('res', res)
          toast.add({
            severity: 'success',

            summary: '成功',
            life: 3000
          })
          router.push('/stafflist')
        })
        .catch((err) => {
          console.log(err)
          toast.add({
            severity: 'error',
            summary: '警告',
            detail: '更新失敗',
            life: 3000
          })
        })
    }
  })
}

//刪除員工
const deleteStaff = () => {
  token.value = Cookies.get('jwt')
  confirm.require({
    message: '確定要刪除嗎?',
    header: '警告',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: '取消',
    acceptLabel: '刪除',
    rejectClass: 'p-button-primary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      axios({
        method: 'delete',
        url: `${VITE_URL}/employee/${id}`,
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
          router.push('/stafflist')
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
  label: '員工管理',
  route: '/stafflist'
})
const items = [{ label: '編輯員工', route: '/staffedit/:id' }]
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
        <form @submit.prevent="updateStaff">
          <div class="card">
            <h6 style="color: red">*為必填</h6>
            <div class="p-fluid grid">
              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="name" class="required-text">姓名</label>
                  <InputText id="name" type="text" v-model="formData.name" />
                </div>
                <div class="field">
                  <label for="department" class="required-text">單位部門</label>
                  <InputText id="department" v-model="formData.department" />
                </div>
                <div class="field">
                  <label for="phone">手機</label>
                  <InputMask
                    id="phone"
                    v-model="formData.phone"
                    mask="9999-999-999"
                    placeholder="請輸入手機號碼"
                  />
                </div>
                <div class="field">
                  <label for="factoryArea" class="required-text">廠區</label>
                  <InputText id="factoryArea" v-model="formData.factoryArea" />
                </div>
                <div class="field">
                  <label for="payLimit">支付限制(金額)</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputSwitch v-model="payLimitSwitch" />
                    </InputGroupAddon>
                    <InputNumber
                      id="payLimit"
                      v-model="formData.payLimit"
                      :disabled="!payLimitSwitch"
                    />
                  </InputGroup>
                </div>
                <div class="field">
                  <label for="rideLimit">搭乘限制(次數)</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputSwitch v-model="rideLimitSwitch" />
                    </InputGroupAddon>
                    <InputNumber
                      id="rideLimit"
                      v-model="formData.rideLimit"
                      :disabled="!rideLimitSwitch"
                    />
                  </InputGroup>
                </div>
                <div class="field">
                  <label for="password" class="required-text">付款密碼</label>
                  <InputText id="password" v-model="formData.payPassword" />
                </div>
              </div>

              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="jobNumber" class="required-text">工號</label>
                  <InputMask
                    id="jobNumber"
                    v-model="formData.jobNumber"
                    mask="99999"
                    placeholder="請輸入工號"
                  />
                </div>
                <div class="field">
                  <label for="email" style="margin-top: 8px">Email</label>
                  <InputText id="email" v-model="formData.email" type="text" />
                </div>
                <label for="firstTime">時段設定</label>
                <div style="margin-top: 8px">
                  <div style="display: flex">
                    <Calendar id="calendar-firstTime1" v-model="formData.sealedTime" timeOnly />
                    <p class="m-2">~</p>
                    <Calendar id="calendar-firstTime2" v-model="formData.sealedTime" timeOnly />
                  </div>
                </div>
                <div class="field">
                  <label for="remark" style="margin-top: 18px">備註</label>
                  <InputText id="remark" v-model="formData.trim.note"></InputText>
                </div>
                <div class="field">
                  <h6 for="permissions">權限</h6>
                  <InputSwitch
                    v-model="formData.authorize"
                    style="margin-right: 24px; margin-top: 8px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              @click="deleteStaff"
              type="button"
              label="刪除員工"
              class="m-1"
              severity="danger"
              outlined
            />
          </div>
          <div>
            <Button type="submit" label="儲存" class="m-1" />
          </div>
        </form>
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
