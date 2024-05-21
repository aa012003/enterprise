import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/stafflist',
          name: 'stafflist',
          component: () => import('../views/staff/StaffList.vue')
        },
        {
          path: '/staffedit/:id',
          name: 'staffedit',
          component: () => import('../views/staff/StaffEdit.vue')
        },
        {
          path: '/staffadd',
          name: 'staffadd',
          component: () => import('../views/staff/StaffAdd.vue')
        },
        {
          path: '/orderlist',
          name: 'orderlist',
          component: () => import('../views/order/OrderList.vue')
        },
        {
          path: '/ordercheck/:id',
          name: 'ordercheck',
          component: () => import('../views/order/OrderCheck.vue')
        },
        {
          path: '/companylist',
          name: 'companylist',
          component: () => import('../views/order/CompanyList.vue')
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: () => import('../views/user/UserList.vue')
        },
        {
          path: '/useradd',
          name: 'useradd',
          component: () => import('../views/user/UserAdd.vue')
        },
        {
          path: '/useredit/:id',
          name: 'useredit',
          component: () => import('../views/user/UserEdit.vue')
        },
        {
          path: '/positionadd',
          name: 'positionadd',
          component: () => import('../views/position/PositionAdd.vue')
        },
        {
          path: '/positionedit/:id',
          name: 'positionedit',
          component: () => import('../views/position/PositionEdit.vue')
        },
        {
          path: '/positionlist',
          name: 'positionlist',
          component: () => import('../views/position/PositionList.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('../views/position/testAdd.vue')
        }
      ]
    }
  ]
})

export default router
