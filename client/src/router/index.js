import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home/Home.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import UserList from '../views/Dashboard/modules/Users/UserList.vue'
import UserDetail from '../views/Dashboard/modules/Users/UserDetail.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Home }
    ]
  },
  {
    path: '/dashboard',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: Dashboard,
        children: [
          { path: 'usuarios', component: UserList },
          { path: 'usuarios/:id', component: UserDetail }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
