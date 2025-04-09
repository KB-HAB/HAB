<template>
  <div class="flex flex-col min-h-screen bg-white px-6 pb-24">
    <!-- Header -->
    <header class="text-lg font-bold mb-6">HAB</header>

    <!-- Body -->
    <main class="flex flex-col gap-6">
      <!-- Profile Section -->
      <section>
        <div class="flex items-center gap-2 mb-1">
          <!-- Title(닉네임) -->
          <p class="text-xl font-bold">닉네임</p>
          <!-- IconButton(연필) -->
          <button class="text-gray-500 text-sm">
            <Pencil />
          </button>
        </div>
        <!-- Title(이메일) -->
        <p class="text-sm text-gray-400">{{ email }}</p>
      </section>

      <!-- SettingButton: 내 데이터 삭제 -->
      <button
          @click="openDialog = true"
          class="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg text-left"
      >
        <div class="flex items-center gap-3">
          <Trash2 />
          내 데이터 삭제
        </div>
      </button>

      <!-- SettingButton: 월 예산 설정 -->
      <button
          @click="goToBudget"
          class="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg text-left"
      >
        <div class="flex items-center gap-3">
          <HandCoins />
          월 예산 설정
        </div>
      </button>
    </main>

    <!-- Footer -->
    <footer class="text-center text-xs text-gray-400 space-x-2 mt-8">
      <span>© 2025 HAB</span>
      <span>·</span>
      <a href="#" class="inline-flex items-center gap-1 hover:text-black"> GitHub </a>
    </footer>

    <!-- Bottom Nav -->
    <nav class="fixed bottom-0 left-0 w-full border-t bg-white flex justify-around py-3">
      <House />
      <House />
      <House />
    </nav>

    <!-- 삭제 확인 다이얼로그 -->
    <el-dialog v-model="openDialog" title="경고" width="300px">
      <span>정말 삭제하시겠습니까?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openDialog = false">취소</el-button>
          <el-button type="danger" @click="handleDelete">예</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const openDialog = ref(false)
const router = useRouter()
const email = ref('hello@email.com')

const handleDelete = () => {
  openDialog.value = false
  alert('삭제되었습니다.')
}

import { Pencil, Trash2, HandCoins, House } from 'lucide-vue-next'

const goToBudget = () => {
  router.push({ name: 'editBudget' })
}
</script>
