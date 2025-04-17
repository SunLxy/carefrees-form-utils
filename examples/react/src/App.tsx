// import { LayoutFormItem } from "@carefrees/form-utils-react/esm/layout/layout.formItem"
// import { LayoutBaseStyled } from "@carefrees/form-utils-react/esm/styles/styles.layout"
import { Form, FormItem, useForm, useWatch } from "@carefrees/form-utils-react"
import { FormInstanceBase } from "@carefrees/form-utils"

const Demo = (props: { form: FormInstanceBase }) => {
  const [value] = useWatch("a", props.form)
  console.log(222)
  return <div>监听a的值：{value}</div>
}

function App() {
  const form = useForm()

  const onSubmit = async () => {
    try {
      console.log(form)
      const result = await form.validate()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }


  return <div>
    <button
      onClick={onSubmit}
    >打印</button>
    <Demo form={form} />
    <Form colCount={4} form={form} formData={{ a: "", b: "", c: "", d: "", e: "", f: "" }}  >
      <FormItem colSpan={2} rules={[{ required: true, message: "必填" }]} name="a" label='测试1'>
        <input style={{ width: "100%" }} placeholder="请输入" />
      </FormItem>
      <FormItem rowSpan={2} rules={[{ required: true, message: "必填" }]} name="b" label='测试2'>
        <textarea style={{ width: "100%", height: "100%" }} placeholder="请输入" />
      </FormItem>
      <FormItem name="c" label='测试3'>
        <input style={{ width: "100%" }} placeholder="请输入" />
      </FormItem>
      <FormItem name="d" label='测试4'>
        <input style={{ width: "100%" }} placeholder="请输入" />
      </FormItem>
      <FormItem name="e" label='测试5'>
        <input style={{ width: "100%" }} placeholder="请输入" />
      </FormItem>
      <FormItem name="f" label='测试6'>
        <input style={{ width: "100%" }} placeholder="请输入" />
      </FormItem>

      <FormItem name="g" label='测试7'>
        <input style={{ width: "100%" }} placeholder="请输入" />
      </FormItem>

    </Form>
  </div>
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

export default App
