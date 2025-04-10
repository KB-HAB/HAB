<template>
  <div class="flex flex-col min-h-screen bg-white px-6 pb-24">
    <!-- Header -->
    <header class="text-lg font-bold mb-6">HAB</header>

    <!-- Body -->
    <main class="flex flex-col gap-6">
      <!-- Profile Section -->
      <section>
        <div class="flex items-center gap-2 mb-1">
          <!-- 닉네임 표시 -->
          <p class="text-xl font-bold">{{ user.nickname }}</p>
          <!-- 닉네임 수정 버튼 (연필 아이콘) -->
          <button class="text-gray-500 text-sm" @click="editNickname">
            <Pencil />
          </button>
        </div>
        <!-- 이메일 표시 -->
        <p class="text-sm text-gray-400">{{ user.email }}</p>
      </section>

      <!-- 설정 버튼: 내 데이터 삭제 -->
      <button
        @click="openDialog = true"
        class="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg text-left"
      >
        <div class="flex items-center gap-3">
          <Trash2 />
          거래 내역 초기화
        </div>
      </button>

      <!-- 설정 버튼: 월 예산 설정 -->
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
      <a href="#" class="inline-flex items-center gap-1 hover:text-black">GitHub</a>
    </footer>

    <!-- Bottom Nav: 새 내비게이션 -->
    <NavBar />

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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 기존에 사용하던 아이콘들
import { Pencil, Trash2, HandCoins } from 'lucide-vue-next'
// 새 내비게이션에 사용할 아이콘들
import NavBar from "@/components/layout/NavBar.vue";

const router = useRouter()

const openDialog = ref(false)
// 사용자 정보를 저장할 객체 (json-server의 단일 유저 사용)
const user = reactive({ id: '', nickname: '', email: '' })

// 컴포넌트가 마운트되면 API를 통해 유저 정보를 가져옴
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/users')
    if (response.data && response.data.length > 0) {
      user.id = response.data[0].id
      user.nickname = response.data[0].nickname
      user.email = response.data[0].email
    } else {
      console.warn('유저 정보를 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error('유저 정보를 가져오는 중 에러 발생:', error)
  }
})

// 닉네임 수정 화면으로 이동
const editNickname = () => {
  router.push({ name: 'editProfile' })
}

// 월 예산 설정 화면으로 이동
const goToBudget = () => {
  router.push({ name: 'editBudget' })
}

// 내 데이터 삭제 처리 함수
const handleDelete = () => {
  openDialog.value = false
  alert('삭제되었습니다.')
}
</script>

<style scoped>
/* 필요에 따라 추가 스타일 작성 */
</style>
