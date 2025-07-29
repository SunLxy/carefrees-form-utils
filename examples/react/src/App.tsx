import { Form, FormItem, useForm, useWatch, FormLayout, FormHideItem } from '@carefrees/form-utils-react';
import { FormInstanceBase } from '@carefrees/form-utils';
import { useState } from 'react';
import FormListDemo from './form-list';
import '@carefrees/form-utils-react/assets/index.css';

const Demo = (props: { form: FormInstanceBase }) => {
  const [value] = useWatch('a', props.form);
  console.log(222);
  return <div>监听a的值：{value}</div>;
};

const Upload = (props: any) => {
  return (
    <input
      type="file"
      placeholder="请上传"
      onChange={(event) => {
        const files = event.target?.files;
        console.log(files);
        props.onChange(files);
      }}
    />
  );
};

function App() {
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

  const onValuesChange = (item: any, allValues: any) => {
    console.log('item', item, allValues);
    if (Reflect.has(item, 'a')) {
      if (item.a === '18') {
        form.updatedFieldHideValue({ address: false });
      } else {
        form.updatedFieldHideValue({ address: true });
      }
    }
  };

  return (
    <div>
      <button onClick={onSubmit}>打印</button>
      <FormListDemo />
      {/* <Demo form={form} />
      <Form
        gap={14}
        colCount={4}
        form={form}
        onValuesChange={onValuesChange}
        hideData={{ address: true }}
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
          <FormItem rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
            <input style={{ width: '100%' }} placeholder="请输入18,显示address表单项" />
          </FormItem>
          <FormHideItem name="address" label="address">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormHideItem>
          <FormItem rowSpan={2} rules={[{ required: true, message: '必填' }]} name="b" label="测试2">
            <textarea style={{ width: '100%', height: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="c" label="测试3">
            <Upload />
          </FormItem>
          <FormItem name="d" label="测试4">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="e" label="测试5">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="f" label="测试6">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>

          <FormItem name="g" label="测试7">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
        </FormLayout>
        <FormLayout
          onGapRow={(row, col) => {
            console.log(row, col);
            setState({ row, col });
          }}
          isAllColSpan
          labelMode="top"
          bordered
          title="4"
        >
          <FormItem colSpan={2} rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem rowSpan={2} rules={[{ required: true, message: '必填' }]} name="b" label="测试2">
            <textarea style={{ width: '100%', height: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="c" label="测试3">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="d" label="测试4">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="e" label="测试5">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="f" label="测试6">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="g" label="测试7">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="h" label="测试8">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="j" label="测试9">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <FormItem name="k" label="测试10">
            <input style={{ width: '100%' }} placeholder="请输入" />
          </FormItem>
          <div style={{ gridColumn: state.col, gridRow: state.row, padding: 8 }}>
            <button type="button" onClick={onSubmit}>
              验😁😝证
            </button>
          </div>
        </FormLayout>
      </Form> */}
    </div>
  );
  // return (
  //   <LayoutBaseStyled>
  //     {/* <LayoutFormItem rowSpan={2} label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem> */}
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box", gridColumn: "1 / -1" }} className="1"></div>
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box" }} className="2"></div>
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box" }} className="3"></div>
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box" }} className="4"></div>
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box" }} className="5"></div>
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box" }} className="6"></div>
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box" }} className="7"></div>
  //     <div style={{ height: 100, border: "1px solid #ccc", boxSizing: "border-box" }} className="8"></div>
  //     {/* <LayoutFormItem>内容</LayoutFormItem>
  //     <LayoutFormItem label='测试' labelMode='left'>内容</LayoutFormItem>
  //     <LayoutFormItem required label='测试222' labelMode='left'>内容</LayoutFormItem> */}
  //   </LayoutBaseStyled>
  // )
}

export default App;
