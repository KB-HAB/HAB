<template>
  <div
    class="flex justify-between items-center bg-[#efefef] p-5 rounded-xl shadow-sm border border-gray-200 cursor-pointer"
    @click="handleClick"
  >
    <div class="flex flex-col justify-between">
      <div class="text-sm text-gray-400 mb-1.5 pl-1">
        {{ formatDate(transaction.date) }}
      </div>
      <div class="text-base font-medium pl-1">
        {{ transaction.title }}
      </div>
    </div>

    <div class="flex flex-col items-end gap-2 pt-1 pr-1">
      <component :is="getCategoryIcon(transaction.category)" class="w-5 h-5 text-gray-500" />
      <div
        :class="[
          'text-base font-semibold',
          transaction.type === '수입' ? 'text-[#6AA25A]' : 'text-black',
        ]"
      >
        {{ transaction.type === '수입' ? '+' : '-' }}
        {{ Number(transaction.amount).toLocaleString() }} 원
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import {
  Utensils,
  Coffee,
  Store,
  Wine,
  ShoppingCart,
  Gamepad,
  Stethoscope,
  Home,
  FileText,
  Scissors,
  Car,
  GraduationCap,
  Sprout,
  MoreHorizontal,
  DollarSign,
  HandCoins,
  PiggyBank,
  HelpCircle,
} from 'lucide-vue-next'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.transaction.id)
}

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${month.padStart(2, '0')}.${day.padStart(2, '0')}`
}

const getCategoryIcon = (category) => {
  const map = {
    1: Utensils,
    2: Coffee,
    3: Store,
    4: Wine,
    5: ShoppingCart,
    6: Gamepad,
    7: Stethoscope,
    8: Home,
    9: FileText,
    10: Scissors,
    11: Car,
    12: GraduationCap,
    13: Sprout,
    14: MoreHorizontal,
    15: DollarSign,
    16: HandCoins,
    17: PiggyBank,
  }
  return map[category] || HelpCircle
}
</script>
