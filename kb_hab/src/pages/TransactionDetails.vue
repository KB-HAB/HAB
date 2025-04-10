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

      <!-- 거래 구분 선택 (수입/지출) -->
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

      <!-- 버튼 영역: 삭제하기 / 저장하기 -->
      <div class="flex justify-between mt-8 gap-4">
        <!-- 삭제하기 버튼 -->
        <CommonButton
          variant="warning"
          class="w-full justify-center"
          @click="openDeleteDialog = true"
        >
          삭제하기
        </CommonButton>
        <!-- 저장하기 버튼 -->
        <CommonButton
          variant="black"
          :class="[saveButtonClasses, 'w-full', 'justify-center']"
          @click="openSaveDialog = true"
        >
          저장하기
        </CommonButton>
      </div>
    </div>

    <!-- 삭제 확인 다이얼로그 -->
    <el-dialog v-model="openDeleteDialog" title="경고" width="300px">
      <span>정말 삭제하시겠습니까?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openDeleteDialog = false">취소</el-button>
          <el-button type="danger" @click="confirmDelete">예</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 저장 확인 다이얼로그 -->
    <el-dialog v-model="openSaveDialog" title="저장 확인" width="300px">
      <span>수정된 내역을 저장하시겠습니까?</span>
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

// 컴포넌트 임포트 (최신 트리 구조에 맞춤)
import InputWithLength from '@/components/common/InputWithLength.vue'
import PriceInput from '@/components/common/PriceInput.vue'
import TwoButtonSelect from '@/components/Transaction/TwoButtonSelect.vue'
import CommonButton from '@/components/common/CommonButton.vue'

const router = useRouter()

// 거래 데이터
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

// 뒤로 가기 핸들러
const handleBack = () => {
  router.back()
}

// 초기 날짜를 저장하여 날짜 변경 여부 판단
const originalDate = ref(transaction.date)

// 수정 내역 여부
const isModified = computed(() => {
  return (
    transaction.name !== '' ||
    transaction.memo !== '' ||
    transaction.amount !== 0 ||
    transaction.type !== '' ||
    transaction.date !== originalDate.value ||
    transaction.category !== ''
  )
})

const saveButtonClasses = computed(() => {
  return isModified.value ? '' : 'opacity-50 cursor-not-allowed'
})

// 삭제 및 저장 다이얼로그 상태 관리
const openDeleteDialog = ref(false)
const openSaveDialog = ref(false)

// 삭제 확인 후 처리 함수
const confirmDelete = () => {
  openDeleteDialog.value = false
  alert('삭제되었습니다.')
  router.push('/transactions')
}

// 저장 확인 후 처리 함수
const confirmSave = () => {
  openSaveDialog.value = false
  alert('저장되었습니다.')
}
</script>

<style scoped>
.custom-datepicker {
  background-color: white;
  width: 240px;
}
</style>
