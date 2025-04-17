<script setup>
import { Button } from "@carefrees/form-utils-vue"

const onClik = () => {
  console.log(2121)
}

</script>

<template>
  <div>
    <Button @click='onClik'>点击</Button>
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