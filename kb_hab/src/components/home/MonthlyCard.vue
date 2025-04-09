<template>
  <div class="bg-white rounded-2xl p-4 shadow-2xl space-y-3">
    <!-- 월 네비게이션 -->
    <div class="flex items-center gap-1 text-lg font-semibold mb-2.5">
      <!-- 이전 달 버튼 -->
      <button @click="goToPrevMonth">
        <ChevronLeft class="w-5 h-5" />
      </button>

      <!-- 현재 월 표시 버튼 (클릭 시 date-picker 열림) -->
      <span class="px-1">
        {{ formattedMonth }}
      </span>

      <!-- 다음 달 버튼 -->
      <button @click="goToNextMonth" :disabled="isCurrentMonth" class="disabled:opacity-30">
        <ChevronRight class="w-5 h-5" />
      </button>

      <!-- 캘린더 아이콘만 있는 버튼 -->
      <button @click="openMonthPicker" class="p-1 rounded hover:bg-gray-200 transition">
        <CalendarDays class="w-5 h-5 text-gray-700" />
      </button>

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
        :amount="income"
        bgColor="bg-[#4B4B4B]"
        textColor="text-white"
      />
      <HomeCard
        title="지출"
        type="expenditure"
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
import { ref, computed } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-vue-next'
import HomeCard from '@/components/home/HomeCard.vue'

// dayjs 추가
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')

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
const emit = defineEmits(['click'])

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
  return today.year() === selected.year() && today.month() === selected.month()
})

// 이전 달 이동
const goToPrevMonth = () => {
  selectedMonth.value = dayjs(selectedMonth.value).subtract(1, 'month').format('YYYY-MM')
}

// 다음 달 이동
const goToNextMonth = () => {
  if (!isCurrentMonth.value) {
    selectedMonth.value = dayjs(selectedMonth.value).add(1, 'month').format('YYYY-MM')
  }
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
