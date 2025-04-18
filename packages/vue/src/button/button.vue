<template>
  <button class="button" :class="buttonStyle">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({ name: 'button' });

type ButtonProps = {
  type?: string;
  size?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`button--${buttonProps.type}`]: buttonProps.type };
});

</script>
<style scoped>
button {
  color: red;
}
</style>