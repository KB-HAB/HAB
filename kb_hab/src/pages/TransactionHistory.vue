<template>
  <div class="p-2.5">
    <div class="bg-white p-4 rounded-2xl shadow-2xl space-y-3">
      <!-- 년.월 + <> 버튼 -->
      <div class="mb-2.5 flex items-center gap-1">
        <button v-if="!isFiltered" @click="goToPrevMonth">
          <ChevronLeft class="w-5 h-5" />
        </button>
        <span class="text-lg font-semibold">
          {{ displayDateLabel }}
        </span>
        <button
          v-if="!isFiltered"
          @click="goToNextMonth"
          :disabled="isCurrentMonth"
          class="disabled:opacity-30"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
        <div class="ml-auto flex gap-2">
          <button @click="openFilterDialog">
            <Filter class="w-5 h-5" />
          </button>
          <el-button type="danger" plain @click="resetFilters">필터 초기화</el-button>
        </div>
      </div>

      <!-- 거래카드 -->
      <div style="background-color: #ffffff">
        <TransactionItemList :transactions="filteredTransactions" @click="goToDetail" />
      </div>
    </div>
  </div>

  <el-dialog
    v-model="isFilterOpen"
    title="필터"
    width="90%"
    class="rounded-xl"
    :close-on-click-modal="true"
    :destroy-on-close="true"
    center
  >
    <div class="space-y-4">
      <!-- 기간 필터 -->
      <div>
        <label class="block mb-1 font-medium">기간</label>
        <el-date-picker
          v-model="tempDateRange"
          type="daterange"
          start-placeholder="시작일"
          end-placeholder="종료일"
          class="w-full"
        />
      </div>

      <!-- 카테고리 필터 -->
      <div>
        <label class="block mb-1 font-medium">카테고리</label>
        <el-select v-model="tempCategory" placeholder="전체" class="w-full">
          <el-option label="전체" :value="''" />
          <el-option
            v-for="(label, id) in categoryMap"
            :key="id"
            :label="label"
            :value="Number(id)"
          />
        </el-select>
      </div>

      <!-- 수입/지출 필터 -->
      <div>
        <label class="block mb-1 font-medium">수입/지출</label>
        <el-select v-model="tempType" placeholder="전체" class="w-full">
          <el-option label="전체" value="" />
          <el-option label="수입" value="수입" />
          <el-option label="지출" value="지출" />
        </el-select>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-2 pt-4">
        <el-button @click="isFilterOpen = false">취소</el-button>
        <el-button type="primary" @click="applyFilters">적용</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, Filter } from 'lucide-vue-next'
import TransactionItemList from '@/components/Transaction/TransactionItemList.vue'
import { dummyTransactions } from '@/data/transactions.js'
import { useRouter } from 'vue-router'
import 'element-plus/es/components/button/style/css'
import axios from 'axios'

const now = new Date()
const selectedDate = ref(new Date())
const selectedDateRange = ref([])
const selectedCategory = ref('')
const selectedType = ref('')
const isFilterOpen = ref(false)

// 임시 저장용
const tempDateRange = ref([])
const tempCategory = ref('')
const tempType = ref('')

const openFilterDialog = () => {
  tempDateRange.value = selectedDateRange.value ? [...selectedDateRange.value] : []
  tempCategory.value = selectedCategory.value
  tempType.value = selectedType.value
  isFilterOpen.value = true
}

const applyFilters = () => {
  selectedDateRange.value = tempDateRange.value.map((d) => new Date(d))
  selectedCategory.value = tempCategory.value
  selectedType.value = tempType.value
  isFilterOpen.value = false
}

const resetFilters = () => {
  selectedDateRange.value = []
  selectedCategory.value = ''
  selectedType.value = ''
}

const currentYear = computed(() => selectedDate.value.getFullYear())
const currentMonth = computed(() => selectedDate.value.getMonth() + 1)

const displayDateLabel = computed(() => {
  if (selectedDateRange.value.length === 2) {
    const start = selectedDateRange.value[0]
    const end = selectedDateRange.value[1]
    const format = (date) => `${date.getMonth() + 1}.${date.getDate()}`
    return `${format(start)} - ${format(end)}`
  }
  return `${currentYear.value}.${String(currentMonth.value).padStart(2, '0')}`
})

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

const startOfDay = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const endOfDay = (date) => {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}
/*
const filteredTransactions = computed(() => {
  return dummyTransactions.value
    .filter((tx) => {
      const txDate = new Date(tx.date)

      const matchesDateRange =
        selectedDateRange.value.length === 2
          ? txDate >= startOfDay(selectedDateRange.value[0]) &&
            txDate <= endOfDay(selectedDateRange.value[1])
          : txDate.getFullYear() === currentYear.value &&
            txDate.getMonth() + 1 === currentMonth.value

      const matchesCategory =
        !selectedCategory.value || tx.category === Number(selectedCategory.value)

      const matchesType = !selectedType.value || tx.type === selectedType.value

      return matchesDateRange && matchesCategory && matchesType
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})
*/
const filteredTransactions = computed(async () => {
  const { data: dummyTransactions } = await axios.get('http://localhost:3000/transaction', {
    params: {
      _page: 1,
      _per_page: 2,
    },
  })
  console.log(filteredTransactions)
  console.log('selectedDateRange:', selectedDateRange.value)

  return dummyTransactions.data
    .filter((tx) => {
      const txDate = new Date(tx.date)

      const matchesDateRange =
        selectedDateRange.value.length === 2
          ? txDate >= startOfDay(selectedDateRange.value[0]) &&
            txDate <= endOfDay(selectedDateRange.value[1])
          : txDate.getFullYear() === currentYear.value &&
            txDate.getMonth() + 1 === currentMonth.value

      const matchesCategory =
        !selectedCategory.value || tx.category === Number(selectedCategory.value)

      const matchesType = !selectedType.value || tx.type === selectedType.value

      return matchesDateRange && matchesCategory && matchesType
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const router = useRouter()
const goToDetail = (id) => {
  router.push(`/transactions/${id}`)
}

const categoryMap = {
  1: '식비',
  2: '카페·간식',
  3: '편의점·마트·잡화',
  4: '술·유흥',
  5: '쇼핑',
  6: '취미·여가',
  7: '의료·건강·피트니스',
  8: '주거·통신',
  9: '보험·세금·기타금융',
  10: '미용',
  11: '교통',
  12: '교육',
  13: '생활',
  14: '카테고리 없음',
  15: '이체',
  16: '급여',
  17: '저축·투자',
}

const isFiltered = computed(() => selectedDateRange.value.length === 2)
</script>
