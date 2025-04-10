<template>
  <div class="bg-white rounded-2xl p-4 shadow-2xl space-y-3">
    <!-- 월 네비게이션 -->
    <div class="flex items-center gap-1 text-lg font-semibold mb-2.5">
      <!-- 이전 달 버튼 -->
      <button @click="goToPrevMonth">
        <ChevronLeft class="w-5 h-5" />
      </button>

      <!-- 현재 월 표시 버튼 (클릭 시 date-picker) -->
      <span class="px-1">
        {{ formattedMonth }}
      </span>

      <!-- 다음 달 버튼 -->
      <button @click="goToNextMonth" :disabled="isCurrentMonth" class="disabled:opacity-30">
        <ChevronRight class="w-5 h-5" />
      </button>

      <!-- 캘린더 아이콘만 있는 버튼 -->
      <IconButton :onClick="openMonthPicker">
        <CalendarDays class="w-5 h-5 text-gray-700" />
      </IconButton>

      <!-- 숨겨진 month picker -->
      <el-date-picker
        ref="monthPickerRef"
        v-model="selectedMonth"
        type="month"
        format="YYYY.MM"
        value-format="YYYY-MM"
        :teleported="false"
        :editable="false"
        :prefix-icon="null"
        class="absolute w-0 h-0 opacity-0 pointer-events-none"
        @change="handleMonthChange"
      />
    </div>

    <!-- 수입/지출 카드 -->
    <div class="flex gap-3">
      <HomeCard
        title="수입"
        type="income"
        :amount="props.income"
        bgColor="bg-[#4B4B4B]"
        textColor="text-white"
      />
      <HomeCard
        title="지출"
        type="props.expenditure"
        :amount="expenditure"
        bgColor="bg-[#F8F8F8]"
        textColor="text-black"
      />
    </div>

    <!-- 순수익 -->
    <div class="px-2 py-3 flex justify-between text-gray-500 font-medium font-semibold">
      <span>순수익</span>
      <span :class="NetProfit >= 0 ? 'text-[#6AA25A]' : 'text-black'">
        {{ NetProfit > 0 ? '+ ' : NetProfit < 0 ? '- ' : '' }}
        {{ Math.abs(NetProfit).toLocaleString() }} 원
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-vue-next'
import HomeCard from '@/components/home/HomeCard.vue'
import IconButton from '@/components/common/IconButton.vue'


// dayjs 추가
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

// 디버그 토글
const showDebug = ref(false)
const toggleDebug = () => {
  showDebug.value = !showDebug.value
}

const now = new Date()
const selectedDate = ref(new Date())
const isFilterOpen = ref(false)

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  // 시작 시 모든 트랜잭션을 가져온 다음 필터링
  // await transactionStore.fetchAllTransactions()
  // 현재 월에 해당하는 데이터만 필터링
  // await loadTransactionsForCurrentMonth()
})

// 선택한 날짜가 변경될 때 데이터 다시 로드
watch(selectedDate, async () => {
  if (!isFiltered.value) {
    await loadTransactionsForCurrentMonth()
  }
})

// 거래 데이터 초기값
// const transaction = reactive({
//   date: '',
//   name: '',
//   memo: '',
//   amount: 0,
//   type: '',
//   category: '',
// })

import { fetchTransactionsByMonth } from '@/api/TransactionApi.js'
import axios from 'axios'
import * as transactionStore from '@/api/TransactionApi.js'

const getIncomeMonth = async (year, month) => {
  const response = await fetchTransactionsByMonth(year, month)
  const income = ref(0)
  for (const responseElement of response) {
    if (responseElement.type === 'INCOME') {
      income.value += responseElement.amount
    }
    return income.value
  }
}

const getExponseMonth = async (year, month) => {
  const response = await fetchTransactionsByMonth(year, month)
  const outcome = ref(0)
  for (const responseElement of response) {
    if (responseElement.type === 'EXPENDITURE') {
      outcome.value += responseElement.amount
    }
    return outcome.value
  }
}

const props = defineProps({
  income: {
    type: Number,
    default: 0,
  },
  expenditure: {
    type: Number,
    default: 0,
  },
})

// emit으로 거래 클릭 이벤트 전달

// 현재 선택된 월 (기본값: 오늘)
const selectedMonth = ref(dayjs().format('YYYY-MM'))
const monthPickerRef = ref(null)

const formattedMonth = computed(() => {
  return dayjs(selectedMonth.value).format('YYYY.MM')
})

// 현재 월 확인
const isCurrentMonth = computed(() => {
  const today = dayjs()
  const selected = dayjs(selectedMonth.value)
  // return currentYear.value === now.getFullYear() && currentMonth.value === now.getMonth() + 1
  return today.year() === selected.year() && today.month() === selected.month()
})

// 이전 달 이동
const goToPrevMonth = () => {
  selectedMonth.value = dayjs(selectedMonth.value).subtract(1, 'month').format('YYYY-MM')
  // api 에서 월 넣어서 transaction 받아서
  console.log('이전 달 이동:', selectedMonth.value)
  let split = selectedMonth.value.split('-')

  const months = transactionStore.fetchTransactionsByMonth(split[0], split[1])
  // 수입만 받아서 income 상태에 넣으세요
  let totalAmount = 0
  let expense = 0
  months
    .then((items) => {
      items.forEach((item) => {
        if (item.type === 'INCOME') {
          totalAmount += item.amount
        } else {
          expense += item.amount
        }
      })
      console.log('총 금액:', totalAmount)
      // props.income = totalAmount
      // props.expenditure = expense
    })
    .catch((error) => {
      console.error('에러 발생:', error)
    })

  // console.log('수입 :', props.income)
  // console.log('지출 :', props.expenditure)

  // 인컴에만 넣으면 홈카드는 자동으로 업데이트
}

// 다음 달 이동
const goToNextMonth = () => {
  if (!isCurrentMonth.value) {
    selectedMonth.value = dayjs(selectedMonth.value).add(1, 'month').format('YYYY-MM')
  }
  // api 에서 월 넣어서 transaction 받아서
  // 지출만 받아서 (요청할때 쿼리 때려도 되고. 받아와서 필터링해도 됨) expense 상태에 넣으세요
  // expense에만 넣으면 홈카드는 자동으로 업데이트
}

// 달 클릭 시 date-picker 열기
const openMonthPicker = () => {
  monthPickerRef.value?.focus()
}

// 달력에서 선택했을 때 값 반영
const handleMonthChange = (val) => {
  selectedMonth.value = val // 이 값은 'YYYY-MM' 형식 문자열
}

// 순수익 = 수입 - 지출
const NetProfit = computed(() => {
  const result = props.income - props.expenditure
  return isNaN(result) ? 0 : result
})
</script>
