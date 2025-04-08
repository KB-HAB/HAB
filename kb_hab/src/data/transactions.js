import { ref } from 'vue'

export const dummyTransactions = ref([
  {
    id: 1,
    date: '2025-04-08',
    title: '점심 식사',
    amount: 12000,
    category: 1,
    type: '지출',
  },
  {
    id: 2,
    date: '2025-04-07',
    title: '교통비',
    amount: 2300,
    category: 11,
    type: '지출',
  },
  {
    id: 3,
    date: '2025-04-06',
    title: '월급',
    amount: 10000000,
    category: 16,
    type: '수입',
  },
  {
    id: 4,
    date: '2025-03-15',
    title: '술',
    amount: 150000,
    category: 4,
    type: '지출',
  },
  {
    id: 5,
    date: '2025-04-06',
    title: '월급',
    amount: 10000000,
    category: 16,
    type: '수입',
  },
  {
    id: 6,
    date: '2025-04-04',
    title: '술',
    amount: 150000,
    category: 4,
    type: '지출',
  },
])
