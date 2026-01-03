import { View, Button, Input, Textarea, Text } from '@tarojs/components';
import { useState } from 'react';
import { Form, FormItem, useForm, useWatch, FormLayout } from '@carefrees/form-utils-react-taro';
import { FormInstanceBase } from '@carefrees/form-utils';
import './index.css';

const Demo = (props: { form: FormInstanceBase }) => {
  const [value] = useWatch('a', props.form);
  console.log(222);
  return <View>监听a的值：{value}</View>;
};

const RenderDemo1 = () => {
  return (
    <View>
      <View className="fairys-taro-popup-search-text-container">
        <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
      </View>
    </View>
  );
};

export default function Index() {
  const form = useForm();
  const [state, setState] = useState<{ row?: number; col?: number }>({ row: undefined, col: undefined });
  const onSubmit = async () => {
    try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Button onClick={onSubmit}>打印</Button>
      <Demo form={form} />
      <Form labelMode="between" colCount={1} inputBordered={false}>
        <FormItem trigger="onInput" name="a1" label="内容占据">
          <RenderDemo1 />
        </FormItem>
      </Form>
      <Form
        gap={14}
        colCount={2}
        form={form}
        formData={{
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: '',
          g: '',
          h: '',
          j: '',
          k: '',
          l: '',
          m: '',
        }}
      >
        <FormLayout formItemLabelStyle={{ width: 60 }} isAllColSpan labelMode="left" bordered title="222">
          <FormItem trigger="onInput" colSpan={2} name="a1" label="内容占据">
            <RenderDemo1 />
          </FormItem>
          <FormItem trigger="onInput" colSpan={2} rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" rowSpan={2} rules={[{ required: true, message: '必填' }]} name="b" label="测试2">
            <Textarea style={{ width: '100%', height: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="c" label="测试3">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="d" label="测试4">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="e" label="测试5">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="f" label="测试6">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="g" label="测试7">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        </FormLayout>
        <FormLayout isAllColSpan labelMode="top" bordered title="4">
          <FormItem trigger="onInput" colSpan={2} rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" rowSpan={2} rules={[{ required: true, message: '必填' }]} name="b" label="测试2">
            <Textarea style={{ width: '100%', height: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="c" label="测试3">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="d" label="测试4">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="e" label="测试5">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="f" label="测试6">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="g" label="测试7">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="h" label="测试8">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="j" label="测试9">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="k" label="测试10">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <View style={{ gridColumn: state.col, gridRow: state.row, padding: 8 }}>
            <Button onClick={onSubmit}>验😁😝证</Button>
          </View>
        </FormLayout>
        <FormLayout formItemLabelStyle={{ width: 60 }} isAllColSpan labelMode="between" bordered title="222">
          <FormItem trigger="onInput" colSpan={2} rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="c" label="测试3">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="d" label="测试4">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="e" label="测试5">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="f" label="测试6">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem trigger="onInput" name="g" label="测试7">
            <Input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        </FormLayout>
      </Form>
    </View>
  );
}
