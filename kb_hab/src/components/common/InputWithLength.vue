<template>
  <div class="space-y-1">
    <CommonInput v-model="text" :placeholder="placeholder" v-bind="$attrs" />
    <div class="text-right text-sm text-gray-400">{{ text.length }} / {{ maxLength }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import CommonInput from './CommonInput.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: 255,
  },
})

const emit = defineEmits(['update:modelValue'])

const text = ref(props.modelValue)

// modelValue가 외부에서 변경됐을 때 반영
watch(
  () => props.modelValue,
  (val) => {
    text.value = val
  },
)

// 내부 text 변경 시 부모에게 반영
watch(text, (val) => {
  emit('update:modelValue', val)
})
</script>
