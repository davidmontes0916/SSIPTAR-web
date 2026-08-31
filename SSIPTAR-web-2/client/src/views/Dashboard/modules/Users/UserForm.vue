<template>
  <div class="user-form">
    <h3>Nuevo Usuario</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.nombre" placeholder="Nombre" required />
      <input v-model="form.apellido_paterno" placeholder="Apellido Paterno" required />
      <input v-model="form.apellido_materno" placeholder="Apellido Materno" required />
      <input v-model="form.correo" type="email" placeholder="Correo" required />
      <select v-model="form.estado">
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <button type="submit">Guardar</button>
      <button type="button" @click="$emit('close')">Cancelar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  correo: '',
  estado: 'Activo'
})

async function handleSubmit() {
  const token = localStorage.getItem('token')
  await axios.post('http://localhost:3000/api/usuarios', form, {
    headers: { Authorization: `Bearer ${token}` }
  })
  alert('Usuario creado ✅')
}
</script>

<style scoped>
.user-form {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
}
</style>
