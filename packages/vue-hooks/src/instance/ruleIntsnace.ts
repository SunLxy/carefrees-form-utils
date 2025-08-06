import AsyncValidator, { RuleItem } from 'async-validator';
import { FormInstanceBase } from './formInstance';
import { MessageType } from '../interface';
import { Ref, ref, toValue } from 'vue';

export class RuleInstanceBase {
  /**
   * 顺序
   * @example
   * "0"
   * "0-0"
   * "0-0-0"
   */
  sort?: string;
  /**表单实例*/
  instance?: Ref<FormInstanceBase<any>>;
  /**
   * 字段 ，分割方式与lodash的get和set方法值更新或设置路径一致
   * @example
   * 默认："name"
   * 嵌套字段："name.a.doc"
   * 嵌套字段："name[1].a.doc"
   * 嵌套字段："name.a[2].doc"
   */
  name: string = '';
  /**规则*/
  rules: Ref<RuleItem[]> = ref([]);
  /**错误提示内容*/
  messages: Ref<MessageType[] | undefined> = ref([]);
  /**判断是否必填*/
  isRequired = () => {
    const findItem = (toValue(this.rules) || []).find((item) => item?.required);
    return !!findItem;
  };

  /**判断是否需要验证*/
  isValidate = () => {
    const rules = toValue(this.rules);
    return Array.isArray(rules) && rules.length;
  };
  /**更新提示信息*/
  updatedMessages = (messages?: MessageType[]) => {
    this.messages.value = messages;
  };

  /**更新规则*/
  updatedRules = (rules: RuleItem[]) => {
    /**更新当前规则*/
    this.rules.value = rules;
    /**当前组件重新渲染*/
    this.updatedMessages?.([]);
  };

  /**验证规则
   */
  validate = () => {
    return new Promise((resolve, reject) => {
      const rules = toValue(this.rules);
      const form = toValue(this.instance);
      const value = form?.getFieldValue?.(this.name);
      new AsyncValidator({ [this.name]: rules || [] })
        .validate({ [this.name]: value })
        .then((values) => {
          this.updatedMessages([]);
          resolve(values);
        })
        .catch(({ errors }) => {
          if (Array.isArray(errors)) {
            this.updatedMessages(errors);
            reject(errors);
          } else {
            reject();
          }
        });
    });
  };

  /**获取校验结果*/
  getValidateResult = () => {
    const msg = toValue(this.messages);
    const tip = Array.isArray(msg) ? msg.map((it) => it.message) : '';
    const isInvalid = Array.isArray(tip) ? !!tip.length : !!tip;

    return {
      tip,
      isInvalid,
    };
  };
}
