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
import CommonButton from '@/components/common/CommonButton.vue'
import PriceInput from '@/components/common/PriceInput.vue'
import { Pencil, House } from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()
const budget = ref(500000)

const goBack = () => {
  router.back()
}

// 예산 업데이트 함수
const saveBudget = async () => {
  try {
    // json-server에서 단일 유저 업데이트: /users/1 (user id 가 "1"인 유저)
    const response = await axios.patch('/users/1', {
      budget_monthly: budget.value
    })

    if (response.status === 200) {
      alert(`예산이 저장되었습니다: ${budget.value.toLocaleString()}원`)
      router.push('/setting')
    } else {
      alert('예산 저장에 실패했습니다.')
    }
  } catch (error) {
    alert('예산 저장 중 오류가 발생했습니다.')
    console.error('Error saving budget:', error)
  }
}
</script>

<style scoped>
/* 스타일은 필요에 따라 작성 */
input:focus {
  outline: none;
}
</style>
