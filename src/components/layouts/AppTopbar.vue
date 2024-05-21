<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLayout } from './composables/layout'
import { useRouter } from 'vue-router'
import AppSidebar from '../layouts/AppSidebar.vue'
import Cookies from 'js-cookie'

const token = ref('')
token.value = Cookies.get('jwt')
const { layoutConfig, onMenuToggle } = useLayout()
const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)
const router = useRouter()

onMounted(() => {
  bindOutsideClickListener()
})
onBeforeUnmount(() => {
  unbindOutsideClickListener()
})
const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`
})

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}

const onSettingsClick = () => {
  topbarMenuActive.value = false
  router.push('/utilities/documentation')
}

const handleLogout = () => {
  topbarMenuActive.value = false
  token.value = Cookies.set('jwt')
  router.push('/')
}

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false
      }
    }

    document.addEventListener('click', outsideClickListener.value)
  }
}

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}

const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return
  const sidebarEl = document.querySelector('.layout-topbar-menu')
  const topbarEl = document.querySelector('.layout-topbar-menu-button')

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  )
}
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/stafflist" class="layout-topbar-logo">
      <!-- <img :src="logoUrl" alt="logo" /> -->
      <span class="text-4xl">企業簽單系統</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    ></button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="handleLogout" class="p-link layout-topbar-button">
        <div class="logout-text">登出</div>
        <i class="pi pi-sign-out"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
