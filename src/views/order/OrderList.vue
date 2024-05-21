<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
// import router from '../../router'
import router from '@/router'
import Checkbox from 'primevue/checkbox'
const ids = ref()
const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')
const orderList = ref([])
const dates = ref()
onMounted(() => {
  getList()
})

const getList = () => {
  token.value = Cookies.get('jwt')
  axios({
    method: 'get',
    url: `${VITE_URL}/enterprise_signature`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      orderList.value = res.data.data.list
      ids.value = orderList.value.map((order) => order.id)
      orderList.value = res.data.data.list.map((order) => {
        order.paymentAt = new Date(order.paymentAt).toLocaleString(undefined, {
          hour12: false
        })
        return order
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleUpdate = (id) => {
  router.replace({ path: `/ordercheck/${id}` })
}
const authorize = true
const data = {}
const home = {
  label: '簽單管理'
}
const items = [{ label: '簽單列表', route: '/orderlist' }]
</script>

<template>
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
  <div>
    <div class="card">
      <Toolbar :style="{ border: 'none', padding: '20px 0px' }">
        <template #start>
          <label for="orderDate" class="m-2">日期</label>
          <Calendar
            selectionMode="range"
            :manualInput="false"
            :showIcon="true"
            dateFormat="yy-mm-dd"
            dateFilter="null"
          />
          <label for="orderDate" class="m-2">司機姓名</label>
          <InputText placeholder="請輸入司機姓名" @change="getList()" type="text" />
        </template>

        <template #center>
          <InputText placeholder="請輸入乘客姓名" @change="getList()" type="text" />
        </template>
        <template #end>
          <Button icon="pi pi-search" />
          <Button severity="info" icon="pi pi-download" class="m-2" />
        </template>
      </Toolbar>

      <DataTable :value="orderList" :rows="10" :paginator="true" responsiveLayout="scroll">
        <Column field="teamName" header="車隊名稱" style="width: 10%"></Column>
        <Column field="driverName" header="司機呼號/姓名" style="width: 10%"></Column>
        <Column field="paymentAt" header="日期時間" style="width: 10%"></Column>
        <Column field="employeeJobNumber" header="工號" style="width: 10%"></Column>
        <Column field="employee.name" header="姓名" style="width: 10%"></Column>
        <Column field="actualFee" header="總金額" style="width: 10%"></Column>
        <Column field="passengerNote" header="乘客備註" style="width: 10%"></Column>
        <Column field="employeeNote" header="簽單備註" style="width: 10%"></Column>
        <Column field="serviceNote" header="異常備註" style="width: 10%"></Column> -->
        <Column header="查看" style="width: 8%">
          <template #body="slot">
            <Button
              @click="handleUpdate(slot.data.id)"
              icon="pi pi-eye"
              severity="info"
              size="small"
              class="m-1"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
"onAddress": "string", "offAddress": "string", "employeeJobNumber": "string", "isPayment": true,
"paymentAt": "2024-04-19T05:49:10.384Z", "signingNote": "string", "passengerNote": "string",
"actualFee": 0, "serviceFee": 0, "serviceNote": "string", "employeeNote": "string", "invoiceId":
"string", "teamId": 0, "teamName": "string", "driverId": 0, "driverName": "string", "company": {
"id": 0 }, "employee": { "id": 0 }
