<template>
  <template v-if='props.name'>
    <FormItemBase v-bind='props as FormItemProps'>
      <template v-for="(_, name) in slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </FormItemBase>
  </template>
  <template v-else>
    <LayoutFormItem :label='props.label' :errorLayout='props.errorLayout' :labelMode='props.labelMode'
      :onlyRuleStyle='props.onlyRuleStyle' :showColon='props.showColon' :colSpan='props.colSpan'
      :rowSpan='props.rowSpan' :style='props.style' :class='props.class' :labelStyle='props.labelStyle'
      :labelClass='props.labelClass'>
      <template v-for="(_, name) in slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </LayoutFormItem>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, } from "vue"
import type { FormItemProps } from "../interface/index"
import LayoutFormItem from "../layout/layout.formItem.vue";
import FormItemBase from "./form.Item.base.vue"
defineOptions({
  name: 'FormItem',
  inheritAttrs: false, // 可选，防止属性自动应用到根元素
});
const props = withDefaults(defineProps<Partial<FormItemProps>>(), {
})

const slots = defineSlots<{
  default: (params: any) => any,
  label: (params: any) => any,
  helpText: (params: any) => any,
  extra: (params: any) => any,
}>()
</script>
