<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
// import router from '../../router'
import router from '@/router'
import Checkbox from 'primevue/checkbox'
const ids = ref()
const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')
const companyList = ref([])
const dates = ref()
onMounted(() => {
  getList()
})

const getList = () => {
  token.value = Cookies.get('jwt')
  axios({
    method: 'get',
    url: `${VITE_URL}/company`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      companyList.value = res.data.data.list
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleUpdate = (id) => {
  console.log('id', id)
  token.value = Cookies.get('jwt')
  axios({
    method: 'get',
    url: `${VITE_URL}/company`,
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then((res) => {
      console.log(companyList.value)
    })
    .catch((err) => {
      console.log(err)
    })
}
const authorize = true
const data = {}
const home = {
  label: '簽單管理'
}
const items = [
  { label: '簽單列表', route: '/orderlist' },
  { label: '企業列表', route: '/companylist' }
]
//搜尋
const search = ref('')
const filteredList = computed(() => {
  const keywords = search.value
    .toLowerCase()
    .split(' ')
    .filter((keyword) => keyword.trim() !== '')

  return companyList.value.filter((company) => {
    return keywords.every((keyword) => {
      return Object.values(company).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(keyword)
        }
        return false
      })
    })
  })
})
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
      <div class="m-5">
        <i class="pi pi-user"></i>
        <label for="orderDate" class="m-2">
          公司總數:<span style="color: red" class="ml-2">{{ companyList.length }}</span>
        </label>
      </div>

      <DataTable :value="filteredList" :rows="10" :paginator="true" responsiveLayout="scroll">
        <Column field="taxIdNumber" header="統一編號"></Column>
        <Column field="name" header="企業名稱"></Column>
        <Column field="contactPerson" header="聯絡人"></Column>
        <Column field="contactPhone" header="聯絡電話"></Column>
        <Column field="signingNote" header="動作">
          <template #body="slot">
            <InputSwitch
              v-model="slot.data.isEnabled"
              @change="handleUpdate(slot.data.id)"
            ></InputSwitch>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
