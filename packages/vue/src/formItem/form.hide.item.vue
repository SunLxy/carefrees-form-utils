<template>
  <template v-if='!isHide'>
    <FormItemBase v-bind='props'>
      <template v-for="(item, name) in slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </FormItemBase>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, } from "vue"
import type { FormItemProps } from "../interface/index"
import FormItemBase from "./form.Item.base.vue"
import { useRegisterFormHideItem } from "@carefrees/form-utils-vue-hooks"

defineOptions({
  name: 'FormHideItem',
  inheritAttrs: false, // 可选，防止属性自动应用到根元素
});
const props = withDefaults(defineProps<FormItemProps>(), {
})
const slots = defineSlots<{
  label: (params: any) => any,
  default: (params: any) => any,
  helpText: (params: any) => any,
  extra: (params: any) => any,
}>()
const { isHide } = useRegisterFormHideItem({ name: props.name, sort: props.sort, isJoinParentField: props.isJoinParentField })
</script>
