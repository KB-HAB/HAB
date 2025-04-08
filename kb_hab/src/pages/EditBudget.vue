<template>
  <div class="min-h-screen bg-white px-4 py-6 flex flex-col">
    <!-- Header -->
    <header class="flex items-center gap-2 mb-6">
      <House class="w-5 h-5 cursor-pointer" @click="goBack" />
      <h1 class="text-lg font-bold">월 예산 설정</h1>
    </header>

    <!-- Body -->
    <main class="flex-1 flex flex-col justify-between">
      <div>
        <label class="block font-bold mb-2">월 예산 (원)</label>
        <CommonInput
            v-model="displayBudget"
            @input="onBudgetInput"
            placeholder="예: 500,000"
            class="text-left font-medium"
        />
      </div>

      <!-- Footer 버튼 영역 -->
      <div class="flex justify-between mt-10 gap-4">
        <!-- CommonButton.vue (취소) -->
        <CommonButton
            variant="white"
            :onClick="goBack"
            class="w-full justify-center"
        >
          취소
        </CommonButton>

        <!-- CommonButton.vue (저장) -->
        <CommonButton
            variant="black"
            :onClick="saveBudget"
            class="w-full justify-center"
        >
          <Pencil class="w-4 h-4" /> 저장하기
        </CommonButton>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CommonButton from '@/components/common/CommonButton.vue'
import CommonInput from '@/components/common/CommonInput.vue'
import { Pencil, House } from 'lucide-vue-next'

// 👉 숫자 포맷 함수 (천 단위 콤마)
const formatNumber = (num) => {
  return num.toLocaleString()
}

const router = useRouter()
const budget = ref(500000)
const displayBudget = ref('')

// 초기화 시 한 번 설정
displayBudget.value = formatNumber(budget.value)

// budget이 바뀔 때마다 displayBudget 자동 갱신
watch(budget, (newVal) => {
  displayBudget.value = formatNumber(newVal)
})

// 뒤로가기
const goBack = () => {
  router.back()
}

// 저장 버튼 클릭
const saveBudget = () => {
  alert(`예산이 저장되었습니다: ${formatNumber(budget.value)}원`)
  router.back()
}

// 숫자 입력 처리
const onBudgetInput = (e) => {
  const raw = e.target.value.replace(/[^\\d]/g, '')
  budget.value = Number(raw)
}
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
