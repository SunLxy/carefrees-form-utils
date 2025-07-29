<template>
  <form :class='cls' :style='formStyle' @submit='onSubmit'>
    <FormLayout v-bind='rest' :class='layoutClass' :style='layoutStyle'>
      <slot />
    </FormLayout>
  </form>

</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults, reactive, defineEmits } from "vue"
import type { FormProps } from "../interface/index"
import { useRegisterForm } from "../hooks/register/register.form"
import { useForm, useFormProvide } from "../hooks/useForm"
import FormLayout from "../layout/layout.vue"
import clx from 'classnames';

defineOptions({
  name: 'Form',
  inheritAttrs: false, // 可选，防止属性自动应用到根元素
});

const props = withDefaults(defineProps<FormProps>(), {
})
const {
  form,
  style,
  formData,
  hideData,
  hideRuleData,
  name,
  onFinish,
  onFinishFailed,
  onValuesChange,
  layoutStyle,
  layoutClass,
  bgcolor,
  ...rest
} = props

const cls = computed(() => clx('carefrees-form', props.class));

const formStyle = computed(() => {
  if (bgcolor)
    return [{ backgroundColor: bgcolor }, props.style];
  return [props.style]
});

const formInstance = useForm(props.form);
formInstance.value.ctor(reactive(props.formData || {}), reactive(props.hideData || {}), reactive(props.hideRuleData || {}));

const emits = defineEmits(["finish", 'valuesChange', 'finishFailed'])

formInstance.value.onFinish = (...rest) => {
  emits("finish", ...rest)
};
formInstance.value.onValuesChange = (...rest) => {
  emits("valuesChange", ...rest)
};
formInstance.value.onFinishFailed = (...rest) => {
  emits("finishFailed", ...rest)
};
useRegisterForm(formInstance.value, props.name)

const onSubmit = (event: Event) => {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  formInstance.value.submit?.();
}

useFormProvide(formInstance.value);

</script>
