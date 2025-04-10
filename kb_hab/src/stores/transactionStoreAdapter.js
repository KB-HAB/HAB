const wait = (ms) => new Promise((res) => setTimeout(res, ms))

const mockTransaction = {
  id: 1,
  date: '2025-04-08',
  title: '점심 식사',
  amount: 12000,
  category: 1,
  type: '지출',
}

export function useTransactionStoreAdapter() {
  // 조회
  const getTransaction = async (id) => {
    await wait(100)
    return mockTransaction
  }

  // 삭제
  const deleteTransaction = async (id, test) => {
    if (test === true) {
      throw new Error()
    }

    try {
      await wait(100)
    } catch (err) {
      console.error('transactionStoreAdapter: deleteTransaction 에러')
      throw err
    }
  }

  // 수정
  const editTransaction = async (id, transaction) => {
    await wait(100)
    return transaction
  }

  // 저장
  const saveTransaction = async (transaction) => {
    await wait(100)
    return transaction
  }

  return {
    getTransaction,
    deleteTransaction,
    editTransaction,
    saveTransaction,
  }
}
