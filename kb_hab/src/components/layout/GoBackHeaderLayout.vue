<script setup>
import { ChevronLeft } from 'lucide-vue-next'
import IconButton from '../common/IconButton.vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const handleClick = () => {
  router.back()
}
</script>

<template>
  <div class="flex w-full h-[48px] items-center bg-white">
    <IconButton :onClick="handleClick">
      <ChevronLeft />
    </IconButton>
    <span class="text-lg font-semibold ml-2">{{ props.title }}</span>
  </div>
</template>
