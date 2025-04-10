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
        <CommonButton variant="black" :onClick="openSaveDialog" class="w-full justify-center">
          <Pencil class="w-4 h-4" />
          저장하기
        </CommonButton>
      </div>
    </main>

    <!-- 저장 확인 다이얼로그 -->
    <el-dialog v-model="openDialog" title="저장 확인" width="300px">
      <span>예산을 저장하시겠습니까?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openDialog = false">취소</el-button>
          <el-button
            @click="confirmSave"
            style="background-color: #6aa25a; color: white; border: none"
          >
            저장
          </el-button>
        </span>
      </template>
    </el-dialog>
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
const budget = ref()
const openDialog = ref(false)

const goBack = () => {
  router.back()
}

const openSaveDialog = () => {
  openDialog.value = true
}

const confirmSave = async () => {
  openDialog.value = false
  try {
    await updateBudgetMonthly(1, budget.value)

    router.push('/setting')
  } catch (error) {
    alert('예산 저장 중 오류가 발생했습니다.')
    console.error('Error saving budget:', error)
  }
}
</script>
