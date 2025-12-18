<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useWorksStore } from '@/stores/works'
import { useSettingsStore } from '@/stores/settings'

onMounted(() => {
  const authStore = useAuthStore()
  const worksStore = useWorksStore()
  const settingsStore = useSettingsStore()
  
  authStore.initAuth()
  worksStore.initWorks()
  settingsStore.initSettings()
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
</style>