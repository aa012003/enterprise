<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')
const positionList = ref([])
const userlist = ref([])
let position_count = {}

onMounted(() => {
  //取得職業列表
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
      console.log(positionList.value)
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  //取得使用者資料
  token.value = Cookies.get('jwt')
  axios({
    method: 'GET',
    url: `${VITE_URL}/company_user`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      userlist.value = res.data.data.list

      //待處理
      position_count = userlist.value.reduce((obj, item) => {
        obj[item.position.id] = obj[item.position.id] ? obj[item.position.id] + 1 : 1
        return obj
      }, {})
      console.log(position_count)
      // positionList.value.push(position_count)
      // console.log(positionList.value)
    })
    .catch((err) => {
      console.log(err)
    })
})

const handleUpdate = (id) => {
  // console.log('id', id)
  router.replace({ path: `/positionedit/${id}` })
}

const authorize = true
const data = {}

//麵包屑
const home = {
  label: '職業管理'
}
const items = [{ label: '職業列表', route: '/positionList' }]
</script>

<template>
  <div>
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
    <div class="card">
      <router-link to="/positionadd"><Button label="新增職位" /></router-link>
      <DataTable :value="positionList" :rows="11" :paginator="true" responsiveLayout="scroll">
        <Column field="name" header="職位" style="width: 10%"></Column>
        <Column field="count" header="數量" style="width: 10%"></Column>
        <Column field="動作" header="動作" style="width: 10%">
          <template #body="slotProps">
            <Button
              @click="handleUpdate(slotProps.data.id)"
              label="修改"
              severity="info"
              size="small"
              class="ml-1"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- <Dialog v-model:visible="visible" modal header="新增員工" :style="{ width: '50rem' }">
      <div class="card">
        <h5>新增員工</h5>
        <h6 style="color: red">*為必填</h6>
        <div class="p-fluid grid">
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="name">*姓名</label>
              <InputText id="name" type="text" />
            </div>
            <div class="field">
              <label for="department">*單位部門</label>
              <InputText id="department" invalid />
            </div>
            <div class="field">
              <label for="number">*電話</label>
              <InputNumber id="number" invalid />
            </div>
            <div class="field">
              <label for="factoryArea">*廠區</label>
              <InputText id="factoryArea" invalid />
            </div>
            <div class="field">
              <label for="payLimit">支付限制(金額)</label>
              <InputGroup>
                <InputGroupAddon>
                  <InputSwitch v-model="payLimit" />
                </InputGroupAddon>
                <InputNumber id="payLimit" type="number" />
              </InputGroup>
            </div>
            <div class="field">
              <label for="rideLimit">搭乘限制(次數)</label>
              <InputGroup>
                <InputGroupAddon>
                  <InputSwitch v-model="rideLimit" />
                </InputGroupAddon>
                <InputNumber id="rideLimit" type="number" />
              </InputGroup>
            </div>
            <div class="field">
              <label for="password">*付款密碼</label>
              <Password id="password" invalid />
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="field">
              <label for="jobNumber">*工號</label>
              <InputNumber id="jobNumber" type="number" />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <InputText id="email" type="text" />
            </div>
            <div class="field">
              <h6 for="permissions">權限</h6>
              <InputSwitch v-model="permissions" />
            </div>
            <label for="firstTime">時段設定</label>
            <div class="col-12 mt-1 mb-2">
              <div style="display: flex">
                <Calendar id="calendar-firstTime1" v-model="time1" timeOnly />
                <p class="m-2">~</p>
                <Calendar id="calendar-firstTime2" v-model="time2" timeOnly />
              </div>
            </div>
            <label for="secondTime">時段設定(選填)</label>
            <div class="col-12 mb-2" style="margin-bottom: 6px">
              <div style="display: flex">
                <Calendar id="calendar-secondTime1" v-model="time3" timeOnly />
                <p class="m-2">~</p>
                <Calendar id="calendar-secondTime2" v-model="time4" timeOnly />
              </div>
            </div>
            <div class="field">
              <label for="remark">備註</label>
              <InputText id="remark"></InputText>
            </div>
          </div>
        </div>
        <div style="text-align: right">
          <Button @click="visible = false">儲存</Button>
        </div>
      </div>
    </Dialog> -->
  </div>
</template>
