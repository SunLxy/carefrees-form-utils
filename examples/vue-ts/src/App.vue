<script lang="ts" setup>
import Formitem from './Formitem.vue';
import Input from './Input.vue';

const onChange = (value: any) => {
  console.log("App received:", value);
};

</script>

<template>
  <div>
    <Formitem :input='Input' @change="onChange" />
  </div>
</template>

<style scoped></style>