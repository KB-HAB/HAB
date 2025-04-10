<template>
  <!-- Container -->
  <div class="flex h-screen w-screen justify-center bg-gray-100">
    <!-- Wrapper -->
    <div class="flex-1 h-full flex flex-col">
      <!-- 본문 ! -->
      <div class="w-full h-full max-w-[800px] mx-auto bg-white overflow-x-hidden flex-1">
        <slot />
      </div>

      <!-- 모바일  -->
      <footer class="flex lg:hidden w-full h-fit">
        <NavBar />
      </footer>
    </div>
  </div>
  <!-- 데스크탑 전용 사이드바 -->
  <aside class="hidden lg:flex fixed top-0 left-0 h-screen w-[80px] bg-white shadow-md z-30">
    <SideBar />
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import GoBackHeaderLayout from '@/components/layout/GoBackHeaderLayout.vue'

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: false,
  },
  showGoBackHeader: {
    type: Boolean,
    default: false,
  },
  goBackTitle: {
    type: String,
    default: '',
  },
})
</script>
