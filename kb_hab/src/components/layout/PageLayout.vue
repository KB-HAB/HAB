<template>
  <!-- Container -->
  <div class="flex items-center h-screen w-screen justify-center overflow-hidden bg-gray-100">
    <!-- Wrapper -->
    <div class="w-full h-full max-w-[800px] flex flex-col">
      <!-- 본문 ! -->
      <div class="w-full flex-1 bg-white overflow-x-hidden">
        <slot />
      </div>

      <!-- 모바일  -->
      <div class="flex lg:hidden w-full h-fit">
        <NavBar />
      </div>
    </div>
  </div>
  <!-- 데스크탑 전용 사이드바 -->
  <SideBar />
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
</script>
