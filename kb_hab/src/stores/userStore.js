import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    budgetMonthly: (state) => state.user?.budgetMonthly || 0,
    nickname: (state) => state.user?.nickname || '',
    email: (state) => state.user?.email || '',
  },

  actions: {
    // 사용자 정보 가져오기
    async fetchUser() {
      this.isLoading = true
      try {
        const res = await axios.get('http://localhost:3000/user/${userid}')
        this.user = res.data
      } catch (err) {
        this.error = err
      } finally {
        this.isLoading = false
      }
    },

    // 사용자 정보 업데이트
    async updateUser(data) {
      try {
        const res = await axios.patch('http://localhost:3000/user/1', data)
        this.user = res.data
      } catch (err) {
        this.error = err
      }
    },

    // 예산만 따로 업데이트
    async updateBudget(amount) {
      if (!this.user) return
      const updated = { ...this.user, budgetMonthly: amount }
      await this.updateUser(updated)
    },
  },
})
