<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import Password from 'primevue/password'
import { useRoute, useRouter } from 'vue-router'
//吐司
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
//選擇欄
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()
//驗證
import * as yup from 'yup'

const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')
//router
const router = useRouter()
const route = useRoute()
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
//新增員工
const staffadd = () => {
  token.value = Cookies.get('jwt')
  axios({
    method: 'post',
    url: `${VITE_URL}/employee`,
    headers: {
      Authorization: `Bearer ${token.value}`
    },
    data: formData.value
  })
    .then((res) => {
      confirm.require({
        message: '確定新增嗎?',
        header: '提示',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-primary p-button-outlined',
        rejectLabel: '取消',
        acceptLabel: '確定',
        accept: () => {
          toast.add({
            severity: 'success',
            summary: '提示',
            detail: '已儲存',
            life: 3000
          })
          router.push('/stafflist')
        }
      })
    })
    .catch((err) => {
      toast.add({
        severity: 'error',
        summary: '錯誤',
        detail: '有資料未填寫或信箱格式錯誤',
        life: 3000
      })
      console.log('add', err)
    })
}

const home = {
  label: '員工管理',
  route: '/stafflist'
}
const items = [{ label: '新增員工', route: '/staffadd' }]

//驗證
const rules = yup.object().shape({
  name: yup.string().required(),
  department: yup.string().required(),
  factoryArea: yup.string().required(),
  jobNumber: yup.string().required(),
  phone: yup.string().required().min(10),
  payPassword: yup.string().required().min(6)
})
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
        <Form ref="form" :validation-schema="rules">
          <div class="card">
            <h6 style="color: red">*為必填</h6>
            <div class="p-fluid grid">
              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="name" class="required-text whitespace-nowrap">姓名</label>
                  <Field v-slot="{ field, errors }" name="name">
                    <InputText
                      v-model="formData.name"
                      v-bind="field"
                      placeholder="請輸入姓名"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
                <div class="field">
                  <label for="department" class="required-text whitespace-nowrap">單位部門</label>
                  <Field v-slot="{ field, errors }" name="department">
                    <InputText
                      v-model="formData.department"
                      v-bind="field"
                      placeholder="請輸入單位部門"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
                <div class="field">
                  <label for="phone" class="required-text whitespace-nowrap">手機</label>
                  <Field v-slot="{ field, errors }" name="phone">
                    <InputText
                      v-model="formData.phone"
                      v-bind="field"
                      placeholder="請輸入手機號碼"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
                <div class="field">
                  <label for="factoryArea" class="required-text whitespace-nowrap">廠區</label>
                  <Field v-slot="{ field, errors }" name="factoryArea">
                    <InputText
                      v-model="formData.factoryArea"
                      v-bind="field"
                      placeholder="請輸入廠區"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
                <div class="field">
                  <label for="payLimit">支付限制(金額)</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputSwitch v-model="formData.payLimitSwitch" />
                    </InputGroupAddon>
                    <InputNumber
                      id="payLimit"
                      v-model="formData.payLimit"
                      :disabled="!formData.payLimitSwitch"
                    />
                  </InputGroup>
                </div>
                <div class="field">
                  <label for="rideLimit">搭乘限制(次數)</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputSwitch v-model="formData.rideLimitSwitch" />
                    </InputGroupAddon>
                    <InputNumber
                      id="rideLimit"
                      v-model="formData.rideLimit"
                      :disabled="!formData.rideLimitSwitch"
                    />
                  </InputGroup>
                </div>
                <div class="field">
                  <label for="payPassword" class="required-text whitespace-nowrap">付款密碼</label>
                  <Field v-slot="{ field, errors }" name="payPassword">
                    <Password
                      v-model="formData.payPassword"
                      v-bind="field"
                      placeholder="請輸入六位數以上密碼"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></Password>
                  </Field>
                </div>
              </div>

              <div class="col-12 md:col-6">
                <div class="field">
                  <label for="jobNumber" class="required-text whitespace-nowrap">工號</label>
                  <Field v-slot="{ field, errors }" name="jobNumber">
                    <InputText
                      v-model="formData.jobNumber"
                      v-bind="field"
                      placeholder="請輸入工號"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
                <div class="field" style="margin-top: 20px">
                  <label for="email" class="whitespace-nowrap">信箱</label>
                  <Field v-slot="{ field, errors }" name="email">
                    <InputText
                      v-model="formData.email"
                      v-bind="field"
                      placeholder="請輸入信箱"
                      :class="{ 'p-invalid': errors.length > 0 }"
                      class="w-full"
                    ></InputText>
                  </Field>
                </div>
                <div class="field">
                  <label for="firstTime">時段設定</label>
                  <div style="margin-top: 6px">
                    <div style="display: flex">
                      <Calendar id="calendar-firstTime1" v-model="formData.sealedTime" timeOnly />
                      <p class="m-2">~</p>
                      <Calendar id="calendar-firstTime2" v-model="formData.sealedTime" timeOnly />
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label for="remark">備註</label>
                  <div style="margin-top: 6px">
                    <InputText id="remark" v-model="formData.note"></InputText>
                  </div>
                </div>
                <div class="field">
                  <h6 for="permissions">權限</h6>
                  <div style="margin-top: 20px">
                    <InputSwitch v-model="formData.authorize" style="margin-right: 24px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button label="儲存" class="m-1" @click="staffadd()" />
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
