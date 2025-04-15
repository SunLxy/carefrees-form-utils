
import { RuleInstanceBase } from "./ruleIntsnace"
import { FormInstanceBase } from "./formInstance"
import { FormItemBaseInstance } from "./formItemBaseInstance"

export class FormItemInstanceBase extends FormItemBaseInstance {
  /**父级字段*/
  parentDataField?: string
  /**通知watch字段更新*/
  noticeDataField?: string
  /**通知 只用于校验规则提示 字段 */
  noticeOnlyRuleDataField?: string[]
  /**只是 进行规则校验 */
  isOnlyRule?: boolean = false
  /**默认是否通知父级监听方法更新
   * @default true
  */
  isNoticeParent: boolean = true
  /**规则*/
  rule?: RuleInstanceBase
  /**是否保护值(不进行表单项组件卸载重置初始值)*/
  preserve?: boolean = true
  /**触发数据更新之后触发（用于数据联动之类的）*/
  onAfterUpdate?: (value: any, instance: FormInstanceBase, instanceAttr: FormItemInstanceBase, event: any) => void
  ctor = (name: string, rule: RuleInstanceBase, updated: Function, sort: string, dependencies?: string[]) => {
    this.name = name
    this.rule = rule
    this.updated = updated
    this.sort = sort
    this.dependencies = dependencies || []
    return this;
  }
}