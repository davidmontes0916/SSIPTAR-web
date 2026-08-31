<template>
  <div class="main-layout">
    <SideBar />
    <div class="content">
      <header class="topbar">
        <button @click="ui.toggleSidebar">☰</button>
        <span>Bienvenido, {{ auth.user?.nombre }}</span>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue'
import { useUiStore } from '../store/ui'
import { useAuthStore } from '../store/auth'

const ui = useUiStore()
const auth = useAuthStore()
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.topbar {
  background: #334155;
  color: #fff;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
main {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
