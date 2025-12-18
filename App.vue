<template>
  <div id="app" class="app">
    <!-- 管理员布局 -->
    <AdminLayout v-if="isAdminRoute">
      <RouterView />
    </AdminLayout>
    
    <!-- 前台布局 -->
    <template v-else>
      <AppHeader />
      <main class="main-content">
        <RouterView />
      </main>
      <AppFooter />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const route = useRoute()

// 判断是否为管理员路由
const isAdminRoute = computed(() => {
  return route.meta?.layout === 'admin' || route.path.startsWith('/admin')
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* 为固定导航栏留出空间 */
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}
</style>