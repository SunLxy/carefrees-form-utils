
import { RuleInstanceBase } from "./ruleIntsnace"
import { FormInstanceBase } from "./formInstance"

export class FormItemInstanceBase {
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
  dataField: string = ''
  /**父级字段*/
  parentDataField?: string
  /**通知watch字段更新*/
  noticeDataField?: string
  /**默认是否通知父级监听方法更新
   * @default true
  */
  isNoticeParent: boolean = true
  /**规则*/
  rule?: RuleInstanceBase
  /**更新当前组件方法*/
  updated?: Function
  /**是否保护值(不进行表单项组件卸载重置初始值)*/
  preserve?: boolean = true
  /**依赖更新项*/
  dependencies?: string[] = []
  /**触发数据更新之后触发（用于数据联动之类的）*/
  onAfterUpdate?: (value: any, instance: FormInstanceBase, instanceAttr: FormItemInstanceBase, event: any) => void
  /**是否是 watch */
  isWatch?: boolean = false
  ctor = (dataField: string, rule: RuleInstanceBase, updated: Function, sort: string, dependencies?: string[]) => {
    this.dataField = dataField
    this.rule = rule
    this.updated = updated
    this.sort = sort
    this.dependencies = dependencies || []
    return this;
  }
}