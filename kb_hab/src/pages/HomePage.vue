<template>
  <!-- <Header /> -->
  <div class="p-4 space-y-2">
    <!-- 하루 쓸 수 있는 돈 -->
    <div class="h-[102px]">
      <HomeCard
        title="이대로 가면 <strong>하루</strong>에 쓸 수 있는 돈"
        bgColor="bg-[#6AA25A]"
        textColor="text-white"
      />
    </div>

    <div class="flex gap-3">
      <!-- 일주일 -->
      <HomeCard
        title="일주일"
        :amount="weeklyAmount"
        bgColor="bg-[#4B4B4B]"
        textColor="text-white"
      />
      <!-- 남은 돈 -->
      <HomeCard
        title="남은 돈"
        :amount="remainingAmount"
        bgColor="bg-[#F8F8F8]"
        textColor="text-black"
        :iconButton="{ icon: Pencil, onClick: handleEditBudget }"
      />
    </div>

    <!-- 수입 / 지출 요약 -->
    <!-- <NavBar /> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Pencil } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import HomeCard from '@/components/home/HomeCard.vue'

const router = useRouter()
const handleEditBudget = () => {
  router.push('/setting/budget')
}

const dailyAmount = ref()
const weeklyAmount = ref()
const remainingAmount = ref()
</script>
