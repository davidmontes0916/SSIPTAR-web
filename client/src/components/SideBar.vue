<template>
  <aside class="sidebar" :class="{ open: ui.sidebarOpen }">
    <nav>
      <ul>
        <li><RouterLink to="/home">🏠 Inicio</RouterLink></li>
        <li><RouterLink to="/dashboard">📊 Dashboard Administrativo</RouterLink></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useUiStore } from '../store/ui'
const ui = useUiStore()
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #1e293b;
  color: #fff;
  height: 100vh;
  padding: 1rem;
  transition: transform 0.3s ease;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 1rem 0;
}
.sidebar a {
  color: #fff;
  text-decoration: none;
}
.sidebar.open {
  transform: translateX(0);
}
</style>
