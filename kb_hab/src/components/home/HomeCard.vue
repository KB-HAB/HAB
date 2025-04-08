<template>
  <!-- Header  -->
  <div class="rounded-xl shadow-md p-4 w-full flex-1 h-[98px]" :class="[bgColor, textColor]">
    <div class="flex flex-col justify-between h-full">
      <span class="text-left self-start text-sm">{{ title }}</span>
      <span class="text-lg font-semibold self-end">{{ formattedAmount }} 원</span>
    </div>
  </div>
  <!-- NavBar -->
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '제목 없음',
  },
  amount: {
    type: Number,
    default: 0,
  },
  bgColor: {
    type: String,
    default: 'bg-gray-100',
  },
  textColor: {
    type: String,
    default: 'text-black',
  },
  iconButton: {},
})

const formattedAmount = computed(() => props.amount.toLocaleString())
</script>
