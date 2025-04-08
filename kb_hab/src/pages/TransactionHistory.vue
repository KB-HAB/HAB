<template>
  <!-- <Header /> -->
  <div class="p-2.5">
    <div class="bg-white p-4 rounded-2xl shadow-2xl space-y-3">
      <!-- 년.월 + <> 버튼 -->
      <div class="mb-2.5 flex items-center gap-1">
        <button @click="goToPrevMonth">
          <ChevronLeft class="w-5 h-5" />
        </button>
        <span class="text-lg font-semibold">
          {{ currentYear }}.{{ currentMonth.toString().padStart(2, '0') }}
        </span>
        <button @click="goToNextMonth" :disabled="isCurrentMonth" class="disabled:opacity-30">
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
      <!-- 거래카드 -->
      <div style="background-color: #ffffff">
        <TransactionItemList :transactions="filteredTransactions" @click="goToDetail" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import TransactionItemList from '@/components/Transaction/TransactionItemList.vue'
import { dummyTransactions } from '@/data/transactions.js'
import { useRouter } from 'vue-router'

const now = new Date()
const selectedDate = ref(new Date())

const currentYear = computed(() => selectedDate.value.getFullYear())
const currentMonth = computed(() => selectedDate.value.getMonth() + 1)

// 현재 월인지 확인
const isCurrentMonth = computed(() => {
  return currentYear.value === now.getFullYear() && currentMonth.value === now.getMonth() + 1
})

const goToPrevMonth = () => {
  selectedDate.value = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() - 1)
}

const goToNextMonth = () => {
  if (!isCurrentMonth.value) {
    selectedDate.value = new Date(
      selectedDate.value.getFullYear(),
      selectedDate.value.getMonth() + 1,
    )
  }
}

const filteredTransactions = computed(() => {
  return dummyTransactions.value.filter((tx) => {
    const txDate = new Date(tx.date) // tx.date는 '2025-04-01' 같은 문자열
    return (
      txDate.getFullYear() === currentYear.value && txDate.getMonth() + 1 === currentMonth.value
    )
  })
})

const router = useRouter()

const goToDetail = (id) => {
  router.push(`/transactions/${id}`)
}
</script>
