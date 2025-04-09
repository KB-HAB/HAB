<template>
  <div class="bg-white rounded-2xl p-4 shadow-md space-y-3">
    <!-- 월 네비게이션 -->
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

    <!-- 수입/지출 카드 -->
    <div class="flex gap-3">
      <HomeCard title="수입" :amount="income" bgColor="bg-[#4B4B4B]" textColor="text-white" />
      <HomeCard title="지출" :amount="expenditure" bgColor="bg-[#F8F8F8]" textColor="text-black" />
    </div>

    <!-- 순수익 -->
    <div class="px-2 py-3 flex justify-between text-gray-500 font-medium font-semibold">
      <span>순수익</span>
      <span :class="NetProfit >= 0 ? 'text-black' : 'text-[#6AA25A]'">
        {{ NetProfit >= 0 ? '+ ' : '- ' }}
        {{ Math.abs(NetProfit).toLocaleString() }} 원
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import HomeCard from '@/components/home/HomeCard.vue'
import TransactionItemList from '@/components/Transaction/TransactionItemList.vue'
import { dummyTransactions } from '@/data/transactions.js'

// emit으로 거래 클릭 이벤트 전달
const emit = defineEmits(['click'])

// 날짜 상태
const now = new Date()
const selectedDate = ref(new Date())

const currentYear = computed(() => selectedDate.value.getFullYear())
const currentMonth = computed(() => selectedDate.value.getMonth() + 1)

// 현재 월인지 확인
const isCurrentMonth = computed(() => {
  return currentYear.value === now.getFullYear() && currentMonth.value === now.getMonth() + 1
})

// 월 이동
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

// 수입 - 지출
const netProfit = computed(() => {
  const result = props.income - props.expenditure
  return isNaN(result) ? 0 : result
})
</script>
