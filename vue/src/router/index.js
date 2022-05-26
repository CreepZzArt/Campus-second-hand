import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import Home from '../views/User'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Shoplayout from "../layout/Shoplayout"

const routes = [
  {
    path: '/',
    name: 'Layout',
    //redirect路由重定向
    redirect:"/user",
    component: Layout,
    children:[
      {
        path: 'user',
        name: 'User',
        component: () => import("@/views/User"),
      },
      {
        path: 'upset',
        name: 'Upset',
        component: () => import("@/views/Upset"),
      },
    ]
  },
  {
    path: '/shophome',
    name: 'Shoplayout',
    component: Shoplayout,
    children:[
      {
        path: '/',
        name: 'Shop',
        component: () => import("@/views/Shop"),
      },
      {
        path: '/wares',
        name: 'Wares',
        component: () => import("@/views/Wares"),
      },
      {
        path: '/thehtml',
        name: 'Thehtml',
        component: () => import("@/views/Thehtml"),
      },
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login"),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("@/views/Register"),
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import("@/views/Shop"),
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
