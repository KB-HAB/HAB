// src/stores/homeStore.js
// src/stores/homeStore.js
import { defineStore } from 'pinia'
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '@/stores/homeTransaction'

export const useHomeStore = defineStore('home', {
  state: () => ({
    transactions: [],
    // dashboard: { totalIncome, totalExpense, totalBalance } – 집계 정보
    dashboard: {
      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0,
    },
    isLoading: false,
    error: null,
  }),

  getters: {
    // 필요 시 게터로 추가적인 연산을 할 수 있습니다.
    incomeTransactions: (state) =>
      state.transactions.filter((tx) => tx.type === 'INCOME'),
    expenseTransactions: (state) =>
      state.transactions.filter((tx) => tx.type === 'EXPENDITURE'),
  },

  actions: {
    // 거래 내역 전체를 불러오고 상태를 업데이트합니다.
    async fetchTransactions() {
      this.isLoading = true
      try {
        const data = await getTransactions()
        this.transactions = data
        this.computeDashboard()
      } catch (err) {
        this.error = err
        console.error('거래 내역 불러오기 실패:', err)
      } finally {
        this.isLoading = false
      }
    },

    // 새로운 거래 내역 추가 후 상태 갱신
    async addTransaction(newTransaction) {
      try {
        const result = await createTransaction(newTransaction)
        this.transactions.push(result)
        this.computeDashboard()
      } catch (err) {
        this.error = err
        console.error('거래 내역 추가 실패:', err)
      }
    },

    // 거래 내역 업데이트 후 상태 반영
    async updateTransaction(updatedTransaction) {
      try {
        const result = await updateTransaction(updatedTransaction.id, updatedTransaction)
        const idx = this.transactions.findIndex(tx => tx.id === updatedTransaction.id)
        if (idx !== -1) {
          this.transactions.splice(idx, 1, result)
          this.computeDashboard()
        }
      } catch (err) {
        this.error = err
        console.error('거래 내역 업데이트 실패:', err)
      }
    },

    // 거래 내역 삭제 후 상태 반영
    async deleteTransaction(id) {
      try {
        await deleteTransaction(id)
        this.transactions = this.transactions.filter(tx => tx.id !== id)
        this.computeDashboard()
      } catch (err) {
        this.error = err
        console.error('거래 내역 삭제 실패:', err)
      }
    },

    // 현재 거래 내역을 기반으로 대시보드 집계 정보를 계산합니다.
    computeDashboard() {
      let totalIncome = 0
      let totalExpense = 0
      this.transactions.forEach(tx => {
        if (tx.type === 'INCOME') {
          totalIncome += Number(tx.amount)
        } else if (tx.type === 'EXPENDITURE') {
          totalExpense += Number(tx.amount)
        }
      })
      this.dashboard = {
        totalIncome,
        totalExpense,
        totalBalance: totalIncome - totalExpense,
      }
    },
  },
})
