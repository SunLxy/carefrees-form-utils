import { Form, FormItem, useWatch, useForm, FormList, FormLayoutRows, FormLayout } from '@carefrees/form-utils-react';
import { useState } from 'react';

// 子节点
const Child = () => {
  // 第一次监听可以获取到值
  const [value] = useWatch('list');
  return <div>list值：{JSON.stringify(value)}</div>;
};

const Demo = () => {
  const [formData] = useState({
    name: '张三',
    age: 18,
    list: [{ name: '张三' }, { name: '李四' }],
  });
  const form = useForm();

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
    <Form formData={formData} form={form}>
      <FormItem rules={[{ required: true, message: '必填' }]} name="name" label="name">
        <input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormItem name="age" label="age">
        <input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormLayoutRows>
        <FormList name="list">
          {(options) => {
            const fields = options.fields;
            return (
              <div>
                <button type="button" onClick={() => options.onAdd({ name: '' })}>
                  添加一项数据
                </button>
                {fields.map((item, index) => {
                  return (
                    <FormLayout key={item.key}>
                      <FormItem isNoticeParentField name={`[${item.name}].name`} label="子项name">
                        <input style={{ width: '100%' }} placeholder="请输入" />
                      </FormItem>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: 8,
                        }}
                      >
                        <button type="button" onClick={() => options.onDelete(index)}>
                          删除数据
                        </button>
                      </div>
                    </FormLayout>
                  );
                })}
              </div>
            );
          }}
        </FormList>
      </FormLayoutRows>
      <FormLayoutRows>
        <Child />
        <div style={{ display: 'flex', alignItems: 'flex-end', padding: 8 }}>
          <button type="button" onClick={onSubmit}>
            提交
          </button>
        </div>
      </FormLayoutRows>
    </Form>
  );
};
export default Demo;
