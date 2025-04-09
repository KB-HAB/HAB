<template>
  <div
    class="rounded-xl shadow-md p-4 w-full flex-1 h-[98px] relative"
    :class="[bgColor, textColor]"
  >
    <!-- 아이콘 버튼의 위치를 더 안쪽으로 이동 -->
    <IconButton
      v-if="iconButton"
      :onClick="iconButton.onClick"
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
    >
      <component :is="iconButton.icon" class="w-5 h-5" />
    </IconButton>

    <div class="flex flex-col justify-between h-full">
      <span class="text-left self-start text-sm" v-html="title"></span>
      <span class="text-lg font-semibold self-end">{{ formattedAmount }} 원</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconButton from '@/components/common/IconButton.vue'

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
  type: {
    type: String,
    default: '', // 'income' 또는 'expenditure'
  },
})

// 부호 붙인 금액 텍스트
const formattedAmount = computed(() => {
  const sign = props.type === 'income' ? '+' : props.type === 'expenditure' ? '-' : ''
  return `${sign}${props.amount.toLocaleString()} `
})
</script>
