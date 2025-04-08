<template>
  <div style="background-color: #ffffff; padding: 20px">
    <TransactionItemList :transactions="dummyTransactions" @click="goToDetail" />
  </div>
</template>

<script setup>
import TransactionItemList from '@/components/Transaction/TransactionItemList.vue'
import { dummyTransactions } from '@/data/transactions.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDetail = (id) => {
  router.push(`/transactions/${id}`)
}
</script>
