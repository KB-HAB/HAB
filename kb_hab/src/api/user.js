import axios from 'axios'

const BASE = 'http://localhost:3000/user'

// [GET] 특정 유저 조회 (id로)
export const getUser = async (id) => {
  const res = await axios.get(`${BASE}/${id}`)
  return res.data
}

// [GET] 전체 유저 목록 조회 (필요할 경우)
export const getAllUsers = async () => {
  const res = await axios.get(BASE)
  return res.data
}

// [POST] 유저 추가
export const createUser = async (user) => {
  const res = await axios.post(BASE, user)
  return res.data
}

// [PUT] 유저 전체 수정
export const updateUser = async (id, user) => {
  const res = await axios.put(`${BASE}/${id}`, user)
  return res.data
}

// [PATCH] 유저 일부 수정 (예: budget만)
export const patchUser = async (id, data) => {
  const res = await axios.patch(`${BASE}/${id}`, data)
  return res.data
}

// [DELETE] 유저 삭제
export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`)
  return res.data
}
