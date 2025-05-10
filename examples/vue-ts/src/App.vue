<script lang="ts" setup>
import { Form, useForm, FormItem } from "@carefrees/form-utils-vue";
import "@carefrees/form-utils-vue/assets/index.css"

const form = useForm();

const onSubmit = async () => {
  try {
    console.log(form)
    const result = await form.value.validate()
    if (result) {
      console.log(result)
    }
  } catch (error) {
    console.log(error)
  }
}

const onSetValue = () => {
  form.value.updatedFieldValue('b', '123')
}

</script>

<template>
  <Form :form='form'>
    <FormItem label='内容' input='input' name='a' :rules='[{ required: true, message: "必填" }]' />
    <FormItem label='内容2' input='input' name='b' />
    <FormItem label='内容3' input='input' name='c' />
    <button type='button' @click='onSubmit'>点击</button>
    <button type='button' @click='onSetValue'>设置值</button>
  </Form>
</template>

<style scoped></style>