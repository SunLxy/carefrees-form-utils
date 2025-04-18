<script setup>
import { inject, watch } from "vue"
const form = inject('form')
console.log('form', form)

const onClik = () => {
  console.log(form, form.value)
}

watch(() => form.value, (val) => {
  console.log('form', val)
})

</script>

<template>
  <div>
    <button @click='onClik'>D获取</button>
  </div>
</template>

<style scoped></style>