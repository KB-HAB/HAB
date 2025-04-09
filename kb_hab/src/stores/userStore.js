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
    async fetchUser(id) {
      this.isLoading = true
      try {
        const res = await axios.get(`http://localhost:3000/user/${id}`)
        this.user = res.data
      } catch (err) {
        this.error = err
        console.error('유저 정보 가져오기 실패:', err)
      } finally {
        this.isLoading = false
      }
    },

    // 사용자 정보 업데이트
    async updateUser(data) {
      try {
        const res = await axios.patch(`http://localhost:3001/user/${data.id}`, data)
        this.user = res.data
      } catch (err) {
        this.error = err
        console.error('유저 업데이트 실패:', err)
      }
    },

    // 예산만 따로 업데이트
    async updateBudget(amount) {
      if (!this.user) return

      // 기존 사용자 정보 복사 + 예산 갱신
      const updated = { ...this.user, budgetMonthly: amount }

      this.user.budgetMonthly = amount
      // 서버에도 업데이트 요청
      await this.updateUser(updated)
    },
  },
})
