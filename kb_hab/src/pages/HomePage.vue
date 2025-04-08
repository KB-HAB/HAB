<template>
  <!-- <Header /> -->
  <div class="p-4 space-y-6">
    <!-- 하루 쓸 수 있는 돈 -->
    <div>
      <HomeCard
        title="이대로 가면 하루에 쓸 수 있는 돈"
        :amount="weeklyAmount"
        bg-color="bg-green-500"
        textColor="text-white"
      />
    </div>

    <div class="flex gap-3">
      <!-- 일주일 -->
      <HomeCard
        title="일주일"
        :amount="weeklyAmount"
        bgColor="bg-gray-800"
        textColor="text-white"
      />
      <!-- 남은 돈 -->
      <HomeCard
        title="남은 돈 "
        :amount="remainingAmount"
        bgColor="bg-gray-100"
        textColor="text-black"
      />
    </div>
  </div>
  <!-- <NavBar /> -->
</template>

<script setup>
import { ref, computed } from 'vue'
import HomeCard from '@/components/home/HomeCard.vue'

const dailyAmount = ref(5789)
const weeklyAmount = ref(40523)
const remainingAmount = ref(247932)

const income = ref(10000)
const expense = ref(10000)
const netIncome = computed(() => income.value - expense.value)

const currentDate = ref(new Date())
const formattedMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  return `${year}.${month}월`
})

const prevMonth = () => {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() - 1)
  currentDate.value = date
}

const nextMonth = () => {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() + 1)
  currentDate.value = date
}
</script>
