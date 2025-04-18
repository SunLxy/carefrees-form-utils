<script setup>
import { computed, provide, ref, isRef } from "vue"
import D from "./D.vue"

const props = defineProps(['a'])

class A {
  a = 1
}

const aData = ref(new A())
// console.log(props)
const data = computed(() => {
  console.log('data', props.a)
  return { a: props.a, b: 2 }
})
console.log('isRef==>', isRef(data))
provide('form', data)
// const form = inject('form')
// console.log('form', form)
const onClik = () => {
  console.log(form)
  aData.value.a++
}

</script>

<template>
  <div>
    <button @click='onClik'>获取</button>
    <D />
  </div>
</template>

<style scoped></style>