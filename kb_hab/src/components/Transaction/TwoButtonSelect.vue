<template>
  <div ref="containerRef" class="flex gap-2 w-full">
    <button
      v-for="option in options"
      :key="option"
      @click.stop="handleClick(option)"
      :class="getButtonClass(option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '', // 아무 것도 선택되지 않은 초기 상태
  },
  options: {
    type: Array,
    default: () => ['수입', '지출'],
  },
})

const emit = defineEmits(['update:modelValue'])

const containerRef = ref(null)

const isSelected = (option) => props.modelValue === option

const getButtonClass = (option) => {
  const baseClass =
    'flex-1 min-w-[90px] px-4 py-2 rounded-xl text-sm sm:text-base flex justify-center items-center border gap-2 font-bold hover:cursor-pointer text-center'
  const selectedClass = 'text-white bg-black border-black hover:bg-gray-800'
  const unselectedClass = 'text-gray-400 bg-gray-100 border-gray-200 hover:bg-gray-200'

  return [baseClass, isSelected(option) ? selectedClass : unselectedClass].join(' ')
}

// 버튼 클릭 시 선택 값을 업데이트
const handleClick = (option) => {
  emit('update:modelValue', option)
}

// 빈 화면 클릭시 선택 취소
const handleDocumentClick = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    emit('update:modelValue', '')
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
</style>
