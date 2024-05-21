<script setup>
import { ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
const model = ref([
  {
    items: [
      {
        label: '員工管理',
        icon: 'pi pi-fw pi-id-card',
        to: '/stafflist'
      },
      {
        label: '簽單管理',
        icon: 'pi pi-fw pi-book',
        to: '/orderlist',
        badge: 'NEW'
      },
      {
        label: '使用者管理',
        icon: 'pi pi-fw pi-user',
        to: '/userlist'
      },
      {
        label: '職位管理',
        icon: 'pi pi-fw pi-briefcase',
        to: '/positionlist'
      }
    ]
  }
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
