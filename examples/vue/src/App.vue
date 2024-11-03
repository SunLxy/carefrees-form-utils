<script setup>
import { instanceDemo } from "./utils/index"
import { computed, watch, ref } from "vue"

const store = new instanceDemo()

// const value = computed(() => {
//   console.log(23)
//   return store.store.a
// })

// watch(store.store, () => {
//   console.log(123232)
// })


// computed(() => {
//   console.log(12)
//   return store.value.store
// })

store.register(() => {
  console.log(value)
})

const onClik = () => {
  console.log(2121)
  store.value.updated({ a: new Date().getTime() })
}


</script>

<template>
  <div>
    <button @click='onClik'>点击</button>
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