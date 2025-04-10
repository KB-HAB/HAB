<template>
  <div class="min-h-screen bg-white px-4 py-6 flex flex-col">

    <!-- Header 영역 -->
    <header class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-bold">프로필 수정</h1>
    </header>
    <div>
      <br />
    </div>
    <!-- 본문 영역 -->
    <main class="flex-1 flex flex-col gap-6">
      <!-- 닉네임 필드 -->
      <NicknameInput v-model="nickname" />

      <!-- 이메일 필드 -->
      <EmailInput v-model="email" />
    </main>

    <!-- Footer 버튼 영역 -->
    <footer class="flex justify-between mt-6 gap-4">
      <CommonButton variant="white" :onClick="cancelEdit" class="w-full justify-center">
        취소
      </CommonButton>
      <CommonButton variant="black" :onClick="saveEdit" class="w-full justify-center">
        저장하기
      </CommonButton>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NicknameInput from '@/components/NicknameInput.vue'
import EmailInput from '@/components/EmailInput.vue'
import CommonButton from '@/components/common/CommonButton.vue'

const router = useRouter()

// v-model을 위한 상태 변수들
const nickname = ref('')
const email = ref('')

const cancelEdit = () => {
  console.log('취소 버튼 클릭')
  router.back()
}

const saveEdit = () => {
  console.log('저장 버튼 클릭')
  console.log('닉네임:', nickname.value)
  console.log('이메일:', email.value)
  // 실제 저장 로직이나 API 호출이 필요하면 여기에 추가하세요.
  router.push({ name: 'setting' })
}
</script>

<style scoped>
/* 필요에 따라 추가 스타일을 작성하세요 */
</style>
