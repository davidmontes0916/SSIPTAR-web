<template>
  <header class="dashboard-header">
    <h2>{{ title }}</h2>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  }
})
</script>

<style scoped>
.dashboard-header {
  background: #334155;
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
}
</style>
