<script setup>

const emits = defineEmits(['change'])

const onClik = () => {
  emits('change', 222)
}

</script>

<template>
  <div>
    <button @click='onClik'>T</button>
  </div>
</template>

<style scoped></style>