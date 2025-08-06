import { RuleInstanceBase } from './ruleIntsnace';
import { FormInstanceBase } from './formInstance';
import { FormItemBaseInstance } from './formItemBaseInstance';
import { Ref } from 'vue';
export class FormItemInstanceBase extends FormItemBaseInstance {
  /**父级字段*/
  parentDataField?: string;
  /**通知 只用于校验规则提示 字段 */
  noticeOnlyRuleDataField?: string[];
  htmlFor?: string;
  control?: Ref<any>;
  /**规则*/
  rule?: Ref<RuleInstanceBase>;
  /**是否保护值(不进行表单项组件卸载重置初始值)*/
  preserve?: boolean = true;
  /**触发数据更新之后触发（用于数据联动之类的）*/
  onAfterUpdate?: (
    value: any,
    instance: Ref<FormInstanceBase>,
    instanceAttr: Ref<FormItemInstanceBase>,
    event: any,
  ) => void;
}
