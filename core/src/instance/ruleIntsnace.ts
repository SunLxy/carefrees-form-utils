import AsyncValidator, { RuleItem } from "async-validator"
import { FormInstanceBase } from "./formInstance"
import { MessageType } from "../interface"

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
  instance?: FormInstanceBase
  /**
   * 字段 ，分割方式与lodash的get和set方法值更新或设置路径一致
   * @example
   * 默认："name"
   * 嵌套字段："name.a.doc"
   * 嵌套字段："name[1].a.doc"
   * 嵌套字段："name.a[2].doc"
  */
  name: string = ''
  /**规则*/
  rules?: RuleItem[] = []
  /**错误提示内容*/
  messages?: MessageType[] | string | undefined
  /**更新当前组件方法*/
  updated?: Function;

  /**判断是否必填*/
  isRequired = () => {
    if (this.instance?.getFieldHideRulesValue?.(this.name)) {
      return false
    }
    const findItem = (this.rules || []).find(item => item?.required)
    return !!findItem
  }
  /**初始化*/
  ctor = (name: string, rules: RuleItem[]) => {
    this.name = name
    this.rules = rules || []
    return this;
  }
  /**判断是否需要验证*/
  isValidate = () => {
    if (this.instance?.getFieldHideRulesValue?.(this.name)) {
      return false
    }
    return Array.isArray(this.rules) && this.rules.length
  }
  /**更新提示信息*/
  updatedMessages = (messages?: MessageType[] | string | undefined) => {
    this.messages = messages || []
    this.updated?.({})
  }

  /**更新规则*/
  updatedRules = (rules: RuleItem[]) => {
    /**更新当前规则*/
    this.rules = rules;
    /**当前组件重新渲染*/
    this.updatedMessages?.([])
  }

  /**验证规则
   * @param {boolean} isOnly 仅判断是否校验通过
  */
  validate = (isOnly: boolean = false) => {
    return new Promise((resolve, reject) => {
      const value = this.instance?.getFieldValue?.(this.name)
      if (this.instance?.getFieldHideRulesValue?.(this.name)) {
        this.updatedMessages([])
        resolve({ [this.name]: value })
      }
      new AsyncValidator({ [this.name]: this.rules || [] })
        .validate({ [this.name]: value })
        .then((values) => {
          if (!isOnly)
            this.updatedMessages([])
          resolve(values)
        }).catch(({ errors }) => {
          if (Array.isArray(errors)) {
            if (!isOnly)
              this.updatedMessages(errors)
            reject(errors)
          } else {
            reject()
          }
        })
    })
  }

  /**获取校验结果*/
  getValidateResult = () => {
    const tip = Array.isArray(this.messages) ? this.messages.map((it) => it.message) : ''
    const isInvalid = Array.isArray(tip) ? !!tip.length : !!tip
    return {
      tip,
      isInvalid
    }
  }
}