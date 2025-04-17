
import { RuleInstanceBase } from "./ruleIntsnace"
import { FormInstanceBase } from "./formInstance"
import { FormItemBaseInstance } from "./formItemBaseInstance"

export class FormItemInstanceBase extends FormItemBaseInstance {
  /**父级字段*/
  parentDataField?: string
  /**通知 只用于校验规则提示 字段 */
  noticeOnlyRuleDataField?: string[]
  /**通知父级字段监听方法更新*/
  isNoticeParentField?: boolean
  /**通知watch监听方法更新*/
  noticeWatchField?: string[]
  htmlFor?: string
  control?: any
  /**规则*/
  rule?: RuleInstanceBase
  /**是否保护值(不进行表单项组件卸载重置初始值)*/
  preserve?: boolean = true
  /**触发数据更新之后触发（用于数据联动之类的）*/
  onAfterUpdate?: (value: any, instance: FormInstanceBase, instanceAttr: FormItemInstanceBase, event: any) => void
  /**更新方法*/
  onChange?: (event: any) => void
  ctor = (name: string, rule?: RuleInstanceBase,) => {
    this.name = name
    this.rule = rule
    return this;
  }
}