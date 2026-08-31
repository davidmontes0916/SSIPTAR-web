<template>
  <div class="dashboard">
    <DashboardHeader title="Dashboard Administrativo" />

    <!-- Menú interno del Dashboard -->
    <nav>
      <RouterLink to="/dashboard/usuarios">👥 Usuarios</RouterLink>
      <!-- Aquí podrías agregar más submódulos -->
    </nav>

    <!-- Aquí se cargan los submódulos -->
    <router-view />
  </div>
</template>

<script setup>
import DashboardHeader from './components/DashboardHeader.vue'
</script>
