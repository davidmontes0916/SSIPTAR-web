<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Correo</label>
      <input type="email" v-model="correo" required />
    </div>
    <div>
      <label>Contraseña</label>
      <input type="password" v-model="contraseña" required />
    </div>
    <button type="submit">Entrar</button>

    <!-- Mensajes -->
    <p v-if="auth.error" class="error">{{ auth.error }}</p>
    <p v-if="auth.successMessage" class="success">{{ auth.successMessage }}</p>
  </form>
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
.success { color: green; font-weight: bold; }
</style>
