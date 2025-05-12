<template>
  <form :class='cls' :style='style' @submit='onSubmit'>
    <FormLayout v-bind='rest' :class='layoutClass' :style='layoutStyle'>
      <slot />
    </FormLayout>
  </form>

</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults, reactive } from "vue"
import type { FormProps } from "../interface/index"
import { useRegisterForm } from "../hooks/register/register.form"
import { useForm, useFormProvide } from "./../hooks/useForm"
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
  ...rest
} = props

const cls = computed(() => clx('carefrees-form', props.class));

const formInstance = useForm(props.form);
formInstance.value.ctor(reactive(props.formData || {}), reactive(props.hideData || {}), reactive(props.hideRuleData || {}));
formInstance.value.onFinish = props.onFinish;
formInstance.value.onValuesChange = props.onValuesChange;
formInstance.value.onFinishFailed = props.onFinishFailed;

useRegisterForm(formInstance.value, props.name)

const onSubmit = (event: Event) => {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  formInstance.value.submit?.();
}

useFormProvide(formInstance.value);

</script>
