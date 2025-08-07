<script lang="ts" setup>
import { ref } from "vue";
import { Form, useForm, FormItem } from "@carefrees/form-utils-vue";
import "@carefrees/form-utils-vue/assets/index.css"
import './app.css'
import Input from './Input.vue';
const formData = ref<{ a: string, b: string }>({
  a: '',
  b: ''
})

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
  formData.value.a = '123'
  formData.value.b = '456'
  // form.value.updatedFieldValue('b', '123')
}

const onSetValue2 = () => {
  // formData.value.a = ''
  // formData.value.b = ''
  formData.value = {
    a: "21",
    b: "22"
  }
  // form.value.updatedFieldValue('b', '123')
}

const onSetValue3 = () => {
  form.value.updatedFieldValue('b', '')
}

const rules1 = ref([{ required: true, message: "必填" }])
const rules2 = ref([{ required: true, message: "必填" }])

const onUpdateRules = () => {
  rules1.value = [{ required: true, message: "必填2" }]
  rules2.value = [{ required: false, message: "不必填" }]
}

</script>
<template>
  <Form :formData='formData' :form='form'>
    <FormItem label='内容' input='input' name='a' :rules='rules1' />
    <FormItem :input='Input' name='b' :rules='rules2'>
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
    <FormItem label='Input' input='input' name='c' />
    <FormItem name='d'>
      <template #label>
        <span>d</span>
      </template>
      <template #helpText>
        <span>helpText</span>
      </template>
      <template #default>
        <input placeholder='输入内容' v-model='formData.a' />
      </template>
      <template #extra>
        <span>extra</span>
      </template>
    </FormItem>
    <button type='button' @click='onSubmit'>验证</button>
    <button type='button' @click='onSetValue'>设置值</button>
    <button type='button' @click='onSetValue2'>设置值2</button>
    <button type='button' @click='onSetValue3'>设置值3</button>
    <button type='button' @click='onUpdateRules'>更新规则</button>
  </Form>
</template>
<style scoped></style>