<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- 데스크탑 전용 사이드바 -->
    <aside class="hidden lg:flex w-[80px] bg-white shadow-md">
      <SideBar />
    </aside>

    <!-- 메인-->
    <div class="flex-1 flex flex-col">
      <div class="w-full max-w-[420px] mx-auto bg-white flex-1 px-4 pt-6 pb-28 lg:pb-0 lg:px-0">
        <slot />
      </div>

      <!-- 모바일 전용 하단 내비게이션 -->
      <footer class="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <NavBar />
      </footer>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
</script>
