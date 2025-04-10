import { defineStore } from 'pinia'
import {
  fetchTransactions,
  fetchTransactionsByDate,
  fetchTransactionsByDateRange,
} from '@/api/TransactionApi'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    loading: false,
    error: null,
    filters: {
      dateRange: [],
      category_id: '',
      type: '',
    },
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  }),

  getters: {
    filteredTransactions() {
      return this.transactions.filter((tx) => {
        // 카테고리 필터
        const matchesCategory =
          !this.filters.category_id || tx.category_id === Number(this.filters.category_id)

        // 타입 필터 (수입/지출)
        const matchesType = !this.filters.type || tx.type === this.filters.type

        // 날짜 범위 필터
        let matchesDateRange = true
        if (this.filters.dateRange && this.filters.dateRange.length === 2) {
          const txDate = new Date(tx.date)
          const startDate = new Date(this.filters.dateRange[0])
          const endDate = new Date(this.filters.dateRange[1])

          // 시작일과 종료일을 포함하는 범위로 설정
          startDate.setHours(0, 0, 0, 0)
          endDate.setHours(23, 59, 59, 999)

          matchesDateRange = txDate >= startDate && txDate <= endDate
        }

        // 최종 필터 결과
        return matchesCategory && matchesType && matchesDateRange
      })
    },

    // 페이지네이션된 트랜잭션 목록
    paginatedTransactions() {
      const start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage
      const end = start + this.pagination.itemsPerPage

      return this.filteredTransactions.slice(start, end)
    },

    // 전체 페이지 수
    totalPages() {
      return Math.ceil(this.filteredTransactions.length / this.pagination.itemsPerPage) || 1
    },
  },

  actions: {
    async fetchTransactionsByMonth(year, month) {
      this.loading = true
      this.error = null

      try {
        // 월의 시작일과 끝일 계산
        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 0) // 다음 달의 0일은 현재 달의 마지막 날

        // 날짜 범위로 데이터 가져오기
        this.transactions = await fetchTransactions()

        // 클라이언트 측에서 월 필터링 적용
        this.transactions = this.transactions.filter((tx) => {
          const txDate = new Date(tx.date)
          return txDate >= startDate && txDate <= endDate
        })

        this.resetPagination()
      } catch (error) {
        this.error = error.message || '거래 내역을 불러오는데 실패했습니다.'
        console.error('Failed to fetch transactions by month:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchTransactionsByDateRange(startDate, endDate) {
      this.loading = true
      this.error = null

      try {
        // 모든 트랜잭션을 불러온 후 클라이언트에서 필터링
        this.transactions = await fetchTransactions()

        // 날짜 범위 필터링
        if (startDate && endDate) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          start.setHours(0, 0, 0, 0)
          end.setHours(23, 59, 59, 999)

          this.transactions = this.transactions.filter((tx) => {
            const txDate = new Date(tx.date)
            return txDate >= start && txDate <= end
          })
        }

        this.resetPagination()
      } catch (error) {
        this.error = error.message || '거래 내역을 불러오는데 실패했습니다.'
        console.error('Failed to fetch transactions by date range:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchAllTransactions() {
      this.loading = true
      this.error = null

      try {
        this.transactions = await fetchTransactions()
        this.resetPagination()
      } catch (error) {
        this.error = error.message || '거래 내역을 불러오는데 실패했습니다.'
        console.error('Failed to fetch all transactions:', error)
      } finally {
        this.loading = false
      }
    },

    setFilter(filterType, value) {
      this.filters[filterType] = value
      this.resetPagination()
    },

    resetFilters() {
      this.filters = {
        dateRange: [],
        category_id: '',
        type: '',
      }
      this.resetPagination()
    },

    // 페이지네이션 관련 메서드
    goToPage(pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.totalPages) {
        this.pagination.currentPage = pageNumber
      }
    },

    nextPage() {
      if (this.pagination.currentPage < this.totalPages) {
        this.pagination.currentPage++
      }
    },

    prevPage() {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage--
      }
    },

    resetPagination() {
      this.pagination.currentPage = 1
    },

    setItemsPerPage(count) {
      this.pagination.itemsPerPage = count
      this.resetPagination()
    },
  },
})
