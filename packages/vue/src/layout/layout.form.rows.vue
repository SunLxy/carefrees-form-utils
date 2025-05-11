<template>
  <div v-bind='props' :class='cls'>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import clx from 'classnames';
import { defineProps, withDefaults, computed, HTMLAttributes } from "vue"
const preCls = 'carefrees-form-layout';
defineOptions({
  name: 'FormLayoutRows',
  inheritAttrs: false, // 可选，防止属性自动应用到根元素
});
const props = withDefaults(defineProps</* @vue-ignore */HTMLAttributes>(), {})
const cls = computed(() => clx(preCls, props.class, {
  'all-colspan': true,
}))
</script>