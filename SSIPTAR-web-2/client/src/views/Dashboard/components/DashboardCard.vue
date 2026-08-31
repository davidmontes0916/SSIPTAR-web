<template>
  <div class="dashboard-card">
    <h3>{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style scoped>
.dashboard-card {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}
</style>
