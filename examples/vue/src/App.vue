<script setup>
// import { Button } from "@carefrees/form-utils-vue"
import { provide, computed, ref } from "vue"
import Child from "./Child.vue"

const a = ref(1)

// const data = computed(() => {
//   return { a: a.value, b: 2 }
// })
// provide('form', data)

const onClik = () => {
  console.log(2121)
  a.value++
  console.log(a.value)
}

</script>

<template>
  <div>
    <button @click='onClik'>设置</button>
    <Child :a='a' />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>