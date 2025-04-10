import axios from 'axios'

const BASE = 'http://localhost:3000/user'
const BASE_TRANS = 'http://localhost:3000/transactions'

// [GET] 특정 유저 조회 (id로)
export const getUser = async (id) => {
  const res = await axios.get(`${BASE}/${id}`)
  return res.data
}

// [POST] 유저 추가
export const createUser = async (user) => {
  const res = await axios.post(BASE, user)
  return res.data
}

// [PATCH] 닉네임 수정
export const updateNickname = async (id, nickname) => {
  const res = await axios.patch(`${BASE}/${id}`, { nickname })
  return res.data
}

// [PATCH] 월 예산 설정
export const updateBudgetMonthly = async (id, budgetMonthly) => {
  const res = await axios.patch(`${BASE}/${id}`, { budgetMonthly })
  return res.data
}

// [DELETE] 유저 삭제
export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`)
  return res.data
}

// [PUT] 내 데이터 초기화 ( budgetMonthly 전부 초기화)
export const resetUserData = async (id) => {
  const res = await axios.put(`${BASE}/${id}`, {
    nickname: '',
    email: '',
    budgetMonthly: 0,
  })
  return res.data
}

// [DELETE] 전체 거래 내역 초기화 (모두 삭제)
export const resetTransactions = async () => {
  const all = await axios.get(BASE_TRANS)
  const deleteAll = all.data.map((tx) => axios.delete(`${BASE_TRANS}/${tx.id}`))
  await Promise.all(deleteAll)
}
