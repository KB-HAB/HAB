<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    "
  >
    <div>
      <p style="font-size: 14px; color: #9ca3af">{{ formatDate(transaction.date) }}</p>
      <p style="font-size: 16px; font-weight: 500">{{ transaction.title }}</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px">
      <component
        :is="getCategoryIcon(transaction.category)"
        style="width: 20px; height: 20px; color: #6b7280"
      />
      <p
        :style="{
          color: transaction.type === '수입' ? '#6AA25A' : '#000000',
          fontSize: '16px',
          fontWeight: '600',
        }"
      >
        {{ transaction.type === '수입' ? '+' : '-' }}
        {{ Number(transaction.amount).toLocaleString() }} 원
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
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

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${Number(month)}.${Number(day)}`
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

<style scoped></style>
