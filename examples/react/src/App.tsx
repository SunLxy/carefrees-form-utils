// import { LayoutFormItem } from "@carefrees/form-utils-react/esm/layout/layout.formItem"
// import { LayoutBaseStyled } from "@carefrees/form-utils-react/esm/styles/styles.layout"
import { Form, FormItem, useForm } from "@carefrees/form-utils-react"


function App() {
  const form = useForm()

  return <div>
    <button
      onClick={() => {
        console.log(form)
      }}
    >打印</button>
    <Form form={form} formData={{ a: "", b: "", c: "", d: "", e: "", f: "" }}  >
      <FormItem name="a" label='测试1'>
        <input placeholder="请输入" />
      </FormItem>
      <FormItem name="b" label='测试2'>
        <input placeholder="请输入" />
      </FormItem>
      <FormItem name="c" label='测试3'>
        <input placeholder="请输入" />
      </FormItem>
      <FormItem name="d" label='测试4'>
        <input placeholder="请输入" />
      </FormItem>
      <FormItem name="e" label='测试5'>
        <input placeholder="请输入" />
      </FormItem>
      <FormItem name="f" label='测试6'>
        <input placeholder="请输入" />
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
