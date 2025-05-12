<script lang="ts" setup>
import { reactive } from "vue";
import { Form, useForm, FormItem } from "@carefrees/form-utils-vue";
import "@carefrees/form-utils-vue/assets/index.css"

const formData = reactive({})

const form = useForm();

const onSubmit = async () => {
  try {
    console.log(form, formData)
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

const onValuesChange = (...rest: any[]) => {
  console.log(rest)
}

</script>

<template>
  <Form @valuesChange='onValuesChange' :formData='formData' :form='form'>
    <FormItem label='内容' input='input' name='a' :rules='[{ required: true, message: "必填" }]' />
    <FormItem input='input' name='b'>
      <template #label>
        <span>s内容2</span>
      </template>
      <template #helpText>
        <span>helpText</span>
      </template>
      <template #extra>
        <span>extra</span>
      </template>
    </FormItem>
    <FormItem label='内容3' input='input' name='c' />
    <button type='button' @click='onSubmit'>点击</button>
    <button type='button' @click='onSetValue'>设置值</button>
  </Form>
</template>

<style scoped></style>