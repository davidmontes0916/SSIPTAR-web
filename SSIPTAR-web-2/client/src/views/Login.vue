<template>
  <div class="login-page">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="correo" placeholder="Correo" required />
      <input type="password" v-model="contraseña" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
      <p v-if="auth.error" class="error">{{ auth.error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const correo = ref('')
const contraseña = ref('')
const auth = useAuthStore()

function handleSubmit() {
  auth.login(correo.value, contraseña.value)
}
</script>

<style scoped>
.error { color: red; }
</style>
