import { defineStore } from 'pinia'
import { getUser, patchUser, updateUser as putUser } from '@/api/user' // ← 네가 만든 user API에서 가져옴

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
    // ✅ 사용자 정보 가져오기
    async fetchUser(id) {
      if (!id) {
        console.error('사용자 ID가 없습니다. fetchUser(id)를 호출해주세요.')
        return
      }

      this.isLoading = true
      try {
        const user = await getUser(id)
        this.user = user
      } catch (err) {
        this.error = err
        console.error('유저 정보 가져오기 실패:', err)
      } finally {
        this.isLoading = false
      }
    },

    // ✅ 전체 정보 업데이트 (PUT)
    async updateUser(data) {
      try {
        const updated = await putUser(data.id, data)
        this.user = updated
      } catch (err) {
        this.error = err
        console.error('유저 전체 업데이트 실패:', err)
      }
    },

    // ✅ 예산만 업데이트 (PATCH)
    async updateBudget(amount) {
      if (!this.user) return
      try {
        const updated = await patchUser(this.user.id, { budgetMonthly: amount })
        this.user = updated
      } catch (err) {
        this.error = err
        console.error('예산 업데이트 실패:', err)
      }
    },
  },
})
