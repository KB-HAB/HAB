import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useBudgetStore = defineStore('budgetStore', () => {
  const BASE_URL = 'http://localhost:3000'
  const remainingBudget = ref(0)
  const dailyRemainingBudget = ref(0)
  const weeklyRemainingBudget = ref(0)
  const monthlyExpenditure = ref(0)
  const monthlyBudget = ref(0)

  const fetchMonthlyBudget = async () => {
    try {
      const response = await axios.get(BASE_URL + '/user')
      monthlyBudget.value = response.data[0].budgetMonthly
    } catch (err) {
      console.error('fetchMonthlyBudget', err)
      throw err
    }
  }

  const getDaysInCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() // 0-based (0 = January)
    // 다음 달 0일 = 이번 달 마지막 날
    return new Date(year, month + 1, 0).getDate()
  }

  const fetchMonthlyExpenditure = async () => {
    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()
    const monthStr = String(currentMonth).padStart(2, '0') // 월을 항상 두 자리로 맞춤 (예: 4 -> "04")
    const startDate = Number(`${currentYear}${monthStr}01`) // 시작일과 종료일 YYYYMMDD 형태로 계산
    const lastDay = new Date(currentYear, currentMonth, 0).getDate()
    const endDate = Number(`${currentYear}${monthStr}${String(lastDay).padStart(2, '0')}`)

    try {
      // 서버에서 해당 월의 INCOME만 가져오기
      const response = await axios.get(BASE_URL + '/transactions', {
        params: {
          type: 'EXPENDITURE',
          date_gte: startDate,
          date_lte: endDate,
        },
      })

      // 총합 계산
      monthlyExpenditure.value = response.data.reduce((sum, tx) => sum + tx.amount, 0)
    } catch (err) {
      console.error('fetchMonthlyExpenditure', err)
      throw err
    }
  }

  const initBudget = async () => {
    await fetchMonthlyBudget()
    await fetchMonthlyExpenditure()

    remainingBudget.value = monthlyBudget.value - monthlyExpenditure.value

    const days = getDaysInCurrentMonth()
    dailyRemainingBudget.value =
      days > 0 ? Math.floor(remainingBudget.value / days) : 0
    weeklyRemainingBudget.value = dailyRemainingBudget.value * 7
  }

  return {
    monthlyBudget,
    remainingBudget,
    dailyRemainingBudget,
    weeklyRemainingBudget,
    initBudget,
  }
})
