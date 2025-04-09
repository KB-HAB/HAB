<template>
  <!-- 전체 컨테이너: 모바일 화면을 고려하여 min-h-screen 사용 -->
  <div class="min-h-screen bg-white px-4 py-6 flex flex-col">
    <!-- Header 영역 -->
    <header class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-bold">닉네임 수정</h1>
    </header>

    <!-- 본문 영역 -->
    <main class="flex-1 flex flex-col gap-6">
      <!-- 닉네임 필드 -->
      <div>
        <!-- 라벨 왼쪽: "닉네임", 오른쪽: 다시하기 버튼 -->
        <label class="block text-sm font-bold mb-2 flex items-center justify-between">
          <span>닉네임</span>
          <!-- 다시하기 버튼: 간단한 텍스트 버튼 스타일 -->
          <button
            @click="generateRandomNickname"
            class="hover:underline text-xs focus:outline-none"
            type="button"
          >
            <RotateCw />
          </button>
        </label>
        <!-- InputWithLength 컴포넌트 사용 (글자수 표시 포함) -->
        <InputWithLength v-model="nickname" :maxLength="255" placeholder="원래 닉네임" />
      </div>

      <!-- 이메일 필드 -->
      <div>
        <label class="block text-sm font-bold mb-2">이메일</label>
        <CommonInput v-model="email" placeholder="hello@email.com" />
      </div>
    </main>

    <!-- Footer 버튼 영역 -->
    <footer class="flex justify-between mt-6 gap-4">
      <!-- 취소 버튼 -->
      <CommonButton variant="white" :onClick="cancelEdit" class="w-full justify-center">
        취소
      </CommonButton>
      <!-- 저장 버튼 -->
      <CommonButton variant="black" :onClick="saveEdit" class="w-full justify-center">
        저장하기
      </CommonButton>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RotateCw } from 'lucide-vue-next'
import InputWithLength from '@/components/common/InputWithLength.vue'
import CommonInput from '@/components/common/CommonInput.vue'
import CommonButton from '@/components/common/CommonButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nickname = ref('')
const email = ref('')

// 랜덤 한글 닉네임 목록
const koreanNicknames = [
  '바람돌이',
  '꽃길만걷자',
  '꿈꾸는별',
  '바다의노래',
  '달빛요정',
  '하늘그림자',
  '희망찬미소',
  '청춘의열정',
  '행복바람',
  '소나기눈물',
]

// "다시하기" 버튼 클릭 시, 목록에서 랜덤 닉네임을 선택하여 설정
const generateRandomNickname = () => {
  const randomIndex = Math.floor(Math.random() * koreanNicknames.length)
  nickname.value =
    koreanNicknames[randomIndex] + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)
}

const cancelEdit = () => {
  console.log('취소 버튼 클릭!')
  router.back()
}

const saveEdit = () => {
  console.log('저장 버튼 클릭!')
  console.log('닉네임:', nickname.value)
  console.log('이메일:', email.value)
  router.push({ name: 'setting' })
}
</script>

<style scoped>
/* 추가적인 스타일이 필요하면 작성하세요 */
</style>
