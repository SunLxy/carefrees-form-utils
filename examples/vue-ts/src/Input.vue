<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from "vue";
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
};
const props = withDefaults(defineProps<InputProps>(), {});
const emits = defineEmits(['change'])
const onChange = (event: any) => {
  console.log("Input", event)
  emits('change', event.target.value);
}
</script>

<template>
  <div>
    <input :value='props.value' @input='onChange' />
  </div>
</template>

<style scoped></style>