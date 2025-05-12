<template>
  <template v-if='props.noStyle'>
    <component :is="props.input" v-bind='toValue(formAttrs.attrsLastData)' />
  </template>
  <template v-else>
    <LayoutFormItem :label='props.label' :required='isRequired' :error-layout='props.errorLayout'
      :label-mode='props.labelMode' :only-rule-style='props.onlyRuleStyle' :show-colon='props.showColon'
      :col-span='props.colSpan' :row-span='props.rowSpan' :html-for='formAttrs.htmlFor' :style='props.style'
      :class='props.class' :label-style='props.labelStyle' :label-class='props.labelClass'
      :validate-result='formAttrs.validateResult'>
      <template v-for="(item, name) in slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
      <template v-slot:default>
        <component :is="props.input" v-bind='toValue(formAttrs.attrsLastData)' />
      </template>
    </LayoutFormItem>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed, toValue } from "vue"
import type { FormItemProps } from "../interface/index"
import { useFormItemAttr } from "../hooks/attr/attr.FormItem"
import LayoutFormItem from "../layout/layout.formItem.vue";
import { useFormItemParentNameProvide } from "../hooks/useFormItemParentName"

defineOptions({
  name: 'FormItemBase',
  inheritAttrs: false, // 可选，防止属性自动应用到根元素
});

const props = withDefaults(defineProps<FormItemProps>(), {
})

const formAttrs = useFormItemAttr(props)

useFormItemParentNameProvide({
  name: formAttrs.newName,
  sort: formAttrs.newSort
})

const slots = defineSlots<{
  label: (params: any) => any,
  helpText: (params: any) => any,
  extra: (params: any) => any,
}>()

const isRequired = computed(() => {
  return !!props.required || !!(toValue(formAttrs.ruleInstance?.value?.rules) || [])?.find((item) => {
    return item.required;
  })
})
</script>
