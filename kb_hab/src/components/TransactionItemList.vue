<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <TransactionItem v-for="item in transactions" :key="item.id" :transaction="item" />
  </div>
</template>

<script setup>
import TransactionItem from './TransactionItem.vue'

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
})
</script>
