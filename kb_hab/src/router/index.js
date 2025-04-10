import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/pages/HomeView.vue'
import AddTransaction from '@/pages/AddTransaction.vue'

import ApiDebug from '@/pages/ApiDebug.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/onboard',
      name: 'onboard',
      component: OnboardingView,
    },
    {
      path: '/',
      name: 'homePage',
      component: HomePage,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionHistory,
    },
    {
      path: '/transactions/:id',
      name: 'transactionsDetails',
      component: TransactionDetails,
      props: true,
    },
    {
      path: '/transactions/add',
      name: 'addTransaction',
      component: AddTransaction,
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
    },
    {
      path: '/setting/profile',
      name: 'editProfile',
      component: EditProfile,
    },

    {
      path: '/setting/budget',
      name: 'editBudget',
      component: EditBudget,
    },
    {
      path: '/test-api',
      name: 'TestApi',
      component: ApiDebug,
    },
  ],
})

export default router
