// src/api/homeTransaction.js
import axios from 'axios'

const BASE = 'http://localhost:3000/transactions'

// [GET] 전체 거래 내역 조회
export const getTransactions = async () => {
  const res = await axios.get(BASE)
  return res.data
}

// [POST] 새로운 거래 내역 추가
export const createTransaction = async (transaction) => {
  const res = await axios.post(BASE, transaction)
  return res.data
}

// [PUT] 거래 내역 전체 수정
export const updateTransaction = async (id, transaction) => {
  const res = await axios.put(`${BASE}/${id}`, transaction)
  return res.data
}

// [DELETE] 거래 내역 삭제
export const deleteTransaction = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`)
  return res.data
}
