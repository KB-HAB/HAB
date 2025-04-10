<template>
  <div class="min-h-screen p-4 flex flex-col">
    <GoBackHeaderLayout title="월 예산 설정" />

    <main class="flex-1 flex flex-col justify-between">
      <div>
        <label class="block font-bold mb-2">월 예산 (원)</label>
        <PriceInput v-model="budget" placeholder="예: 500,000" />
      </div>

      <!-- Footer 버튼 영역 -->
      <div class="flex justify-between mt-10 gap-4">
        <CommonButton variant="white" :onClick="goBack" class="w-full justify-center">
          취소
        </CommonButton>
        <CommonButton variant="black" :onClick="saveBudget" class="w-full justify-center">
          <Pencil class="w-4 h-4" />
          저장하기
        </CommonButton>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { updateBudgetMonthly } from '@/api/user'

import GoBackHeaderLayout from '@/components/layout/GoBackHeaderLayout.vue'
import CommonButton from '@/components/common/CommonButton.vue'
import PriceInput from '@/components/common/PriceInput.vue'
import { Pencil, House } from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()
const budget = ref(500000)

const goBack = () => {
  router.back()
}

const saveBudget = async () => {
  try {
    await updateBudgetMonthly(1, budget.value) // ← 단일 유저 id: 1

    alert(`예산이 저장되었습니다: ${budget.value.toLocaleString()}원`)
    router.push('/setting')
  } catch (error) {
    alert('예산 저장 중 오류가 발생했습니다.')
    console.error('Error saving budget:', error)
  }
}
</script>
