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
          <p class="text-xl font-bold">{{user.nickname}}</p>
          <!-- IconButton(연필) -->
          <button class="text-gray-500 text-sm" :onClick="editNickname">
            <Pencil />
          </button>
        </div>
        <!-- Title(이메일) -->
        <p class="text-sm text-gray-400">{{ user.email }}</p>
      </section>

      <!-- SettingButton: 내 데이터 삭제 -->
      <button
        @click="openDialog = true"
        class="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg text-left"
      >
        <div class="flex items-center gap-3">
          <Trash2 />
          거래 내역 초기화
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
import { ref, reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const openDialog = ref(false)
const router = useRouter()
const email = ref('hello@email.com')
const nickName = ref('닉네임')

const handleDelete = () => {
  openDialog.value = false
  alert('삭제되었습니다.')
}

const user = reactive({ id: '', nickname: '', email: '' })

// 컴포넌트가 마운트되면 API 요청
onMounted(async () => {
  try {
    // 이메일로 유저 정보 요청 (json-server는 항상 배열 형태로 반환)
    const response = await axios.get('http://localhost:3000/users')
    if (response.data && response.data.length > 0) {
      user.id = response.data[0].id
      user.nickname = response.data[0].nickname
      user.email = response.data[0].email
    } else {
      console.warn('해당 이메일의 유저를 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error)
  }
})


import { Pencil, Trash2, HandCoins, House } from 'lucide-vue-next'

const editNickname = () => {
  router.push({ name: 'editProfile' })
}

const goToBudget = () => {
  router.push({ name: 'editBudget' })
}
</script>
