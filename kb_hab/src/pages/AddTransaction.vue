<template>
  <div class="p-4">
    <!-- Header: 뒤로가기 버튼 -->
    <header class="flex items-center gap-2 mb-6">
      <button @click="handleBack" class="p-2 hover:bg-gray-100 rounded-full">
        <ChevronLeft class="w-5 h-5" />
      </button>
    </header>

    <!-- Body: 입력 폼 -->
    <div class="mt-6 space-y-6">
      <!-- 날짜 선택 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">날짜</label>
        <el-date-picker
          v-model="transaction.date"
          type="date"
          value-format="yyyy-MM-dd"
          prefix-icon="Calendar"
          placeholder="날짜를 선택하세요"
        />
      </div>

      <!-- 거래 이름 입력 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">거래 이름</label>
        <InputWithLength
          v-model="transaction.name"
          placeholder="거래 이름을 입력하세요"
          :maxLength="100"
          class="w-full"
        />
      </div>

      <!-- 메모 입력 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">메모</label>
        <InputWithLength
          v-model="transaction.memo"
          placeholder="메모를 입력하세요"
          type="textarea"
          class="w-full"
        />
      </div>

      <!-- 가격 입력 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">가격(원)</label>
        <PriceInput
          v-model="transaction.amount"
          placeholder="가격을 입력하세요"
          class="w-full"
        />
      </div>

      <!-- 거래 구분 선택 (수입 / 지출) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">구별</label>
        <TwoButtonSelect
          v-model="transaction.type"
          :leftOption="'수입'"
          :rightOption="'지출'"
        />
      </div>

      <!-- 카테고리 선택 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
        <select
          v-model="transaction.category"
          class="w-full px-4 py-2 bg-gray-100 rounded-xl text-gray-800 focus:outline-none"
        >
          <option value="" disabled>카테고리를 선택하세요</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- 버튼 영역: 저장하기만 존재 -->
      <div class="flex justify-end mt-8">
        <CommonButton
          variant="black"
          :disabled="!canSave"
          :class="[saveButtonClasses, 'w-full', 'justify-center']"
          @click="handleSave"
        >
          저장하기
        </CommonButton>
      </div>
    </div>

    <!-- 저장 확인 다이얼로그 -->
    <el-dialog v-model="openSaveDialog" title="저장 확인" width="300px">
      <span>거래를 저장하시겠습니까?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openSaveDialog = false">취소</el-button>
          <el-button type="primary" @click="confirmSave">예</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'

import InputWithLength from '@/components/common/InputWithLength.vue'
import PriceInput from '@/components/common/PriceInput.vue'
import TwoButtonSelect from '@/components/Transaction/TwoButtonSelect.vue'
import CommonButton from '@/components/common/CommonButton.vue'

const router = useRouter()

// 거래 데이터 초기값
const transaction = reactive({
  date: new Date().toISOString().slice(0, 10),
  name: '',
  memo: '',
  amount: 0,
  type: '',
  category: '',
})

// 예제용 카테고리 목록
const categories = [
  { id: 1, name: '식비' },
  { id: 2, name: '교통' },
  { id: 3, name: '쇼핑' },
]

// 뒤로가기 핸들러
const handleBack = () => {
  router.back()
}

// 필수 필드가 모두 채워졌는지 확인
const canSave = computed(() => {
  return (
    transaction.name.trim() !== '' &&
    transaction.memo.trim() !== '' &&
    transaction.amount > 0 &&
    transaction.type.trim() !== '' &&
    transaction.category !== ''
  )
})

// 저장 버튼 활성화 클래스
const saveButtonClasses = computed(() => {
  return canSave.value ? '' : 'opacity-50 cursor-not-allowed'
})

// 저장 다이얼로그 상태 관리
const openSaveDialog = ref(false)

// 저장하기 버튼 클릭 시, 필수 입력이 모두 채워졌는지 확인하고, 채워지지 않았다면 아무 동작도 하지 않음
const handleSave = () => {
  if (!canSave.value) return
  openSaveDialog.value = true
}

// 저장 확인 후 처리 함수
const confirmSave = () => {
  openSaveDialog.value = false
  alert('새로운 거래가 저장되었습니다.')
}
</script>

<style scoped>
</style>
