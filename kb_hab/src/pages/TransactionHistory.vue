<template>
  <div style="background-color: #ffffff; padding: 20px">
    <TransactionItemList :transactions="dummyTransactions" />
  </div>
</template>

<script setup>
import TransactionItemList from '@/components/Transaction/TransactionItemList.vue'
import { dummyTransactions } from '@/data/transactions.js'
</script>
