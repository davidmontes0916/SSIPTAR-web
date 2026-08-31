<template>
  <div>
    <h3>Usuarios</h3>
    <DashboardTable :columns="columns" :data="usuarios" />
    <button @click="showForm = true">➕ Nuevo Usuario</button>

    <UserForm v-if="showForm" @close="showForm = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DashboardTable from '../../components/DashboardTable.vue'
import UserForm from './UserForm.vue'

const usuarios = ref([])
const columns = ['nombre', 'apellido_paterno', 'apellido_materno', 'correo', 'estado', 'rol']
const showForm = ref(false)

onMounted(async () => {
  const token = localStorage.getItem('token')
  const res = await axios.get('http://localhost:3000/api/usuarios', {
    headers: { Authorization: `Bearer ${token}` }
  })
  usuarios.value = res.data
})
</script>
