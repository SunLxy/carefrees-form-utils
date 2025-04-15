/**
 * @description 注册组件
*/
import { } from "@carefrees/form-utils"
import type { RuleItem } from "async-validator"

export interface RegisterFormItemOptions {
  /**字段*/
  name: string
  /**规则*/
  rules?: RuleItem[]

}

/**注册表单项*/
export const useRegisterFormItem = (options: RegisterFormItemOptions) => {
  // 注册规则
  // 注册单个实例


}
