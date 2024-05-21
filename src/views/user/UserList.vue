<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

const VITE_URL = import.meta.env.VITE_PATH
const token = ref('')
const userlist = ref([])
let position_count = {}

onMounted(() => {
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
      // console.log('使用者列表', userlist.value)
      position_count = userlist.value.reduce((obj, item) => {
        obj[item.position.id] = obj[item.position.id] ? obj[item.position.id] + 1 : 1
        return obj
      }, {})
      console.log(position_count)
    })
    .catch((err) => {
      console.log(err)
      // alert(err.response.data.message)
    })
})

function handleUpdate(id) {
  // console.log('id', id)
  router.replace({ path: `/useredit/${id}` })
}

//麵包屑
const home = ref({
  label: '使用者管理'
})
const items = ref([{ label: '使用者列表', route: '/userlist' }])

//搜尋
const search = ref('')
const filteredList = computed(() => {
  const keywords = search.value
    .toLowerCase()
    .split(' ')
    .filter((keyword) => keyword.trim() !== '')

  return userlist.value.filter((user) => {
    return keywords.every((keyword) => {
      return Object.values(user).some((value) => {
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
          <router-link to="/useradd">
            <Button label="+ 使用者" />
          </router-link>
        </template>

        <template #center>
          <InputGroup>
            <InputText
              class="form-control me-2"
              type="search"
              placeholder="請輸入關鍵字..."
              aria-label="Search"
              v-model.trim="search"
            />
            <Button icon="pi pi-search" type="submit" @click="filterList()" />
          </InputGroup>
        </template>

        <template #end>
          <div>使用者人數: {{ userlist.length }} 人</div>
        </template>
      </Toolbar>

      <DataTable
        :value="filteredList"
        :rows="11"
        :paginator="true"
        responsiveLayout="scroll"
        stripedRows
      >
        <Column field="name" header="名稱" style="width: 10%" :sortable="true"></Column>
        <Column field="account" header="帳號" style="width: 10%" :sortable="true"></Column>
        <Column field="position.name" header="職位" style="width: 10%" :sortable="true"></Column>
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
  </div>
</template>
