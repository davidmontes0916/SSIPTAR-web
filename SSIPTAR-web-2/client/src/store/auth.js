import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    error: null,
    successMessage: null
  }),
  actions: {
    async login(correo, contrasena) {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/login', { correo, contrasena })
        this.user = res.data.user
        this.token = res.data.token
        localStorage.setItem('token', this.token)
        this.error = null
        this.successMessage = 'Inicio de sesión exitoso ✅'

        router.push('/home')
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al iniciar sesión'
        this.successMessage = null
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      this.successMessage = null
      router.push('/login')
    }
  }
})
