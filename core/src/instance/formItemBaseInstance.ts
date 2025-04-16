import { FormInstanceBase } from "./formInstance"
export class FormItemBaseInstance {
  /**
    * 顺序
    * @example
    * "0"
    * "0-0"
    * "0-0-0"
   */
  sort?: string;
  /**
   * 字段 ，分割方式与lodash的get和set方法值更新或设置路径一致
   * @example
   * 默认："name"
   * 嵌套字段："name.a.doc"
   * 嵌套字段："name[1].a.doc"
   * 嵌套字段："name.a[2].doc"
  */
  name: string = ''
  /**更新当前组件方法*/
  updated?: Function
  /**依赖更新项*/
  dependencies?: string[] = []
  /**是否是 watch */
  isWatch?: boolean = false
  /**表单实例*/
  instance?: FormInstanceBase
}