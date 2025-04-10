import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const fetchTransactions = async (params = {}) => {
  try {
    const response = await axios.get('api/transactions', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}

export const fetchTransaction = async (id) => {
  try {
    const response = await axios.get(`api/transactions/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching transaction with id ${id}:`, error)
    throw error
  }
}

export const fetchTransactionsByDate = async (year, month) => {
  try {
    // Format the date range for the specified month
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate =
      month === 12 ? `${year + 1}-01-01` : `${year}-${String(month + 1).padStart(2, '0')}-01`

    const params = {
      date_gte: startDate,
      date_lt: endDate,
      _sort: 'date',
      _order: 'desc',
    }

    console.log('요청 날짜 범위:', startDate, '~', endDate)

    const response = await axios.get('api/transactions', { params })

    console.log('받은 데이터:', response.data)

    return response.data
  } catch (error) {
    console.error(`Error fetching transactions for ${year}-${month}:`, error)
    throw error
  }
}

export const fetchTransactionsByDateRange = async (startDate, endDate) => {
  try {
    const formattedStart = startDate.toISOString().split('T')[0]

    const nextDay = new Date(endDate)
    nextDay.setDate(nextDay.getDate() + 1)
    const formattedEnd = nextDay.toISOString().split('T')[0]

    console.log('📦 요청 날짜:', startDate, endDate)
    console.log('📦 ISO 변환 결과:', formattedStart, formattedEnd)
    const params = {
      date_gte: formattedStart,
      date_lt: formattedEnd,
      _sort: 'date',
      _order: 'desc',
    }

    const response = await axios.get('api/transactions', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching transactions by date range:', error)
    throw error
  }
}
