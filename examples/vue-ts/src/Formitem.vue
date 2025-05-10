<script lang="ts" setup>
// import { Component } from "vue"
// // 获取组件的原生元素类型
// type GetNativeElementType<T> = T extends new (...args: any[]) => { $el: infer E } ? E : never;
// // 获取元素的属性类型
// type ElementAttrs<T> = T extends HTMLElement ? Partial<T> : never;
// // 定义 props 接口
// interface Props<T extends Component> {
//   input: T;
//   attrs?: ElementAttrs<GetNativeElementType<T>>;
// }
// // 定义 props
// const props = defineProps<Props<Component>>();
import type { Component, ComponentPublicInstance, } from 'vue'
import { useAttrsInject } from "@carefrees/form-utils-vue";
import { watch } from "vue";

// 获取组件实例类型
type ComponentInstance<T> = T extends new (...args: any[]) => infer R
  ? R extends ComponentPublicInstance
  ? R['$props']
  : never
  : never;

interface Props<T extends Component> {
  input: T;
  attrs?: ComponentInstance<T>;
}
const props = defineProps<Props<Component>>();

const attrs = useAttrsInject();
// @ts-ignore
console.log("attrs===>", attrs.value.colCount)
watch(() => attrs?.value?.colCount?.value, (newVal, oldVal) => {
  console.log("colCount===>", newVal, oldVal)
})


// const props = defineProps<FormitemProps>()
const emit = defineEmits(['change']);
console.log("Formitem", props)

const onInputChange = (event: any) => {
  console.log("Formitem", event)
  emit('change', event);
}

</script>

<template>
  <div>
    <component v-bind='props.attrs' :is="props.input" @change='onInputChange' />
  </div>
</template>

<style scoped></style>