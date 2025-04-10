<template>
  <aside
    class="hidden lg:flex fixed top-0 left-0 h-screen w-[72px] flex-col items-center justify-between py-8"
  >
    <div>HAB</div>
    <div class="flex flex-col items-center gap-14" center>
      <router-link to="/" class="text-black hover:opacity-70">
        <HomeIcon class="w-8 h-8" />
      </router-link>
      <router-link to="/transactions/add" class="text-black hover:opacity-70">
        <PlusSquareIcon class="w-8 h-8" />
      </router-link>
      <router-link to="/setting" class="text-black hover:opacity-70">
        <UserRound class="w-8 h-8" />
      </router-link>
    </div>
    <Github class="w-8 h-8 text-black hover:opacity-70" />
  </aside>
</template>

<script setup>
import { HomeIcon, PlusSquareIcon, UserRound, Github } from 'lucide-vue-next'
</script>
