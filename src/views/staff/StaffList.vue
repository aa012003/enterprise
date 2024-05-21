<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')

//取得員工列表
const employeeList = ref([])
onMounted(() => {
  token.value = Cookies.get('jwt')
  axios({
    method: 'GET',
    url: `${VITE_URL}/employee`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      // console.log('員工列表', employeeList.value)
      // employeeList.value = res.data.data.list
      employeeList.value = res.data.data.list.map((employee) => {
        employee.sealedTime = new Date(employee.sealedTime).toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        })
        return employee
      })
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
})
//取得路徑id
const handleUpdate = (id) => {
  router.replace({ path: `/staffedit/${id}` })
}

//麵包屑
const home = {
  label: '員工管理'
}
const items = [{ label: '員工列表', route: '/stafflist' }]

//搜尋
const search = ref('')
const filteredList = computed(() => {
  const keywords = search.value
    .toLowerCase()
    .split(' ')
    .filter((keyword) => keyword.trim() !== '')

  return employeeList.value.filter((employee) => {
    return keywords.every((keyword) => {
      return Object.values(employee).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(keyword)
        }
        return false
      })
    })
  })
})
// console.log(employeeList)
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
      <Toolbar :style="{ border: 'none', padding: '20px 0px' }">
        <template #start>
          <router-link to="/StaffAdd"><Button label="+ 員工" /></router-link>
        </template>

        <template #center>
          <InputGroup>
            <InputText
              class="form-control me-2"
              type="search"
              placeholder="請輸入關鍵字..."
              v-model.trim="search"
            />
            <Button icon="pi pi-search" type="submit" @click="filterList()" />
          </InputGroup>
        </template>

        <template #end>
          <div>員工人數: {{ employeeList.length }} 人</div>
        </template>
      </Toolbar>
      <DataTable
        :value="filteredList"
        :rows="10"
        :paginator="true"
        responsiveLayout="scroll"
        stripedRows
        tableStyle="min-width: 50rem"
        scrollable
      >
        <Column field="jobNumber" header="工號" :sortable="true" style="width: 10%"></Column>
        <Column field="name" header="姓名" :sortable="true" style="width: 8%"></Column>
        <Column field="factoryArea" :sortable="true" header="廠區" style="width: 8%"></Column>
        <Column field="department" :sortable="true" header="部門" style="width: 8%"></Column>
        <Column field="phone" header="電話" style="width: 8%"></Column>
        <Column field="sealedTime" :sortable="true" header="可搭乘時段" style="width: 8%"></Column>
        <Column
          field="payLimit"
          :sortable="true"
          header="支付限制(金額/趟)"
          style="width: 8%"
        ></Column>
        <Column
          field="takingLimit"
          :sortable="true"
          header="搭乘限制(趟次/月)"
          style="width: 8%"
        ></Column>
        <Column field="authorize" header="權限" :sortable="true">
          <template #body="slotProps">
            <span>
              <i v-if="slotProps.data.authorize" class="pi pi-check" style="color: green"></i>
              <i v-else class="pi pi-times" style="color: red"></i>
            </span>
          </template>
        </Column>
        <Column field="動作" header="動作" style="width: 8%" alignFrozen="right" frozen>
          <template #body="slot">
            <Button
              @click="handleUpdate(slot.data.id)"
              label="修改"
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
