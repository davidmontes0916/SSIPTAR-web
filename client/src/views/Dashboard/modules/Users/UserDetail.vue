<template>
  <div>
    <h3>Detalle de Usuario</h3>
    <p><strong>Nombre:</strong> {{ usuario?.nombre }}</p>
    <p><strong>Correo:</strong> {{ usuario?.correo }}</p>
    <p><strong>Estado:</strong> {{ usuario?.estado }}</p>
    <p><strong>Rol:</strong> {{ usuario?.rol }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const usuario = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('token')
  const res = await axios.get(`http://localhost:3000/api/usuarios/${route.params.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  usuario.value = res.data
})
</script>
