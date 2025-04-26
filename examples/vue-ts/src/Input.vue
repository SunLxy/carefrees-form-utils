<script lang="ts" setup>
// import { InputHTMLAttributes } from 'vue'
interface InputProps {
  // attrs?: InputHTMLAttributes;
  type?: string;
  placeholder?: string;
  value?: string;
  // ... 其他输入框相关的属性
};

const props = defineProps<InputProps>();

const emits = defineEmits(['change'])
const onChange = (event: any) => {
  console.log("Input", event)
  emits('change', event.target.value);
}
</script>

<template>
  <div>
    <input @input='onChange' />
  </div>
</template>

<style scoped></style>