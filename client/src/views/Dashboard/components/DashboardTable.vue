<template>
  <table class="dashboard-table">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col">{{ col }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id">
        <td v-for="col in columns" :key="col">{{ row[col] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  columns: Array,
  data: Array
})
</script>

<style scoped>
.dashboard-table {
  width: 100%;
  border-collapse: collapse;
}
.dashboard-table th,
.dashboard-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}
</style>
