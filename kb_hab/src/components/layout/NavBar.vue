<template>
  <nav class="fixed left-0 bottom-0 w-full bg-white py-4 flex justify-around items-center">
    <router-link to="/" class="text-black hover:opacity-70">
      <HomeIcon class="w-8 h-8" />
    </router-link>
    <router-link to="/transactions/add" class="text-black hover:opacity-70">
      <PlusSquareIcon class="w-8 h-8" />
    </router-link>
    <router-link to="/setting" class="text-black hover:opacity-70">
      <UserRound class="w-8 h-8" />
    </router-link>
  </nav>
</template>

<script setup>
import { HomeIcon, PlusSquareIcon, UserRound } from 'lucide-vue-next'
</script>
