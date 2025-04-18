<script setup>
import { isVNode, cloneVNode } from "vue"

const onChange = (event) => {
  console.log("D", event)
}

const slots = defineSlots()

// 获取原始插槽内容
const originalSlots = slots.default ? slots.default() : [];
console.log(originalSlots)
// 修改插槽内容
const modifiedSlots = originalSlots.map((vnode) => {
  if (isVNode(vnode)) {
    // 克隆 VNode 并添加属性
    return cloneVNode(vnode, {
      someProp: "newValue",
      onChange: onChange
    });
  }
  return vnode; // 如果不是 VNode，直接返回
});


</script>

<template>
  <div>
    <div>
      <!-- 渲染修改后的插槽内容 -->
      <div>
        <template v-for="(vnode, index) in modifiedSlots" :key="index">
          <component :is="vnode" />
        </template>
      </div>
    </div>
    <!-- <slot @change='onChange' /> -->
  </div>
</template>

<style scoped></style>