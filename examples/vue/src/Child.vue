<script setup>
import D from "./D.vue"
import T from "./T.vue"

const onChange = (event) => {
  console.log("Child", event)
}

</script>

<template>
  <div>
    <D>
      <T @change='onChange' />
    </D>
  </div>
</template>

<style scoped></style>