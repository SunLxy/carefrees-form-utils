<script lang="ts" setup>
import { ref, watch } from 'vue';
import Formitem from './Formitem.vue';
import Input from './Input.vue';
import { useAttrsProvide } from "@carefrees/form-utils-vue";

const onChange = (value: any) => {
  console.log("App received:", value);
};
const colCount = ref(2);
class D {
  a = 1;
}

const Ins = ref(new D());
const Ins2 = ref(new D());

watch(colCount, (newVal, oldVal) => {
  Ins.value.a = colCount.value;
  Ins2.value.a = colCount.value;
  console.log("colCount", newVal, oldVal);
})

useAttrsProvide({ colCount })

const onUpdateColCount = () => {
  colCount.value++;
  console.log("App colCount", colCount.value, Ins.value.a, Ins2.value.a);
}

</script>

<template>
  <div>
    <Formitem :input='Input' @change="onChange" />
    <div>{{ Ins.a }}</div>
    <button @click='onUpdateColCount'>点击切换</button>
  </div>
</template>

<style scoped></style>