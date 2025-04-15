import { FormListInstanceBase } from "./formListInstance"
import { FormItemInstanceBase } from "./formItemInstance"
import { FormHideItemInstanceBase } from "./formHideItemInstance"
import { FormEmptyItemInstanceBase } from "./formEmptyItemInstance"
import { Callbacks, ErrorDataField } from "../interface"
import { get, set, cloneByNamePathList, has } from "./../utils"

/**基础实例*/
export class FormInstanceBase<T = any> {
  /**表单数据*/
  formData: Partial<T> = {};
  /**表单每一项实例*/
  formItemInstances: FormItemInstanceBase[] = [];
  /**表单中List实例集合*/
  formListInstances: Map<string, FormListInstanceBase> = new Map([]);
  /** 回调函数 */
  private callbacks: Callbacks = {}

  // ======================================隐藏组件=====================================
  /**隐藏组件集合*/
  hideItemInstances: FormHideItemInstanceBase[] = []
  /**隐藏组件字段对应的值*/
  hideState = {}

  // ======================================不显示组件，只占位=====================================
  /**占位组件集合*/
  emptyItemInstances: FormEmptyItemInstanceBase[] = []
  /**占位组件字段对应的值*/
  emptyState = {}

  /**实例是否初始化*/
  isMountInstance: boolean = false
  /**是否保护值(不进行表单项组件卸载重置初始值)*/
  preserve?: boolean = true

  // ======================================隐藏规则校验=====================================
  hideRuleState: Record<string, boolean> = {}

  /**初始化*/
  ctor = (initial: Partial<T> = {}, hideState?: Record<string, boolean>, hideRuleState?: Record<string, boolean>, emptyState?: Record<string, boolean>) => {
    this.formData = initial || {};
    this.hideState = hideState || {}
    this.hideRuleState = hideRuleState || {}
    this.emptyState = emptyState || {}
    this.isMountInstance = true;
    return this;
  }

  private dispatch_resetFieldValueCount = 0;
  /**
  * 重置数据值
 */
  resetFieldValue = (initial: Partial<T> = {}) => {
    /**初始化第一次不进行重置*/
    if (this.dispatch_resetFieldValueCount === 0) {
      this.dispatch_resetFieldValueCount++;
      return;
    }
    this.dispatch_resetFieldValueCount++;
    const keys = Object.keys({ ...initial, ...this.formData })
    this.formData = initial || {};
    this.notice(keys);
    /**清空验证提示信息*/
    if (this.formItemInstances && this.formItemInstances.length) {
      this.formItemInstances.forEach((formItemInstance) => {
        formItemInstance?.rule?.updatedMessages?.([])
      })
    }
    return this;
  }

  /**注册一个 formIList 实例*/
  registerFormList = (name: string, itemInstance: FormListInstanceBase) => {
    this.formListInstances.set(name, itemInstance);
    return () => {
      this.formListInstances.delete(name);
    }
  }

  /**注册一个 formItem 实例*/
  registerFormItem = (itemInstance: FormItemInstanceBase) => {
    this.formItemInstances.push(itemInstance)
    return () => {
      this.formItemInstances = this.formItemInstances.filter(ite => ite !== itemInstance);
      let preserve = this.preserve;
      if (itemInstance.preserve === false) {
        preserve = itemInstance.preserve
      }

      const name = `${itemInstance.name}`
      // 判断路径是否存在
      if (name && has(this.formData, name) && !preserve) {
        this.formData = set(this.formData, itemInstance.name, undefined);
      }
    }
  }

  /**注册一个 form hide item 实例*/
  registerFormHideItem = (hideItemInstance: FormHideItemInstanceBase) => {
    this.hideItemInstances.push(hideItemInstance)
    return () => {
      this.hideItemInstances = this.hideItemInstances.filter(ite => ite !== hideItemInstance);
      /**需要处理默认值问题*/
    }
  }

  /**注册一个 form Empty item 实例*/
  registerFormEmptyItem = (emptyItemInstance: FormEmptyItemInstanceBase) => {
    this.emptyItemInstances.push(emptyItemInstance)
    return () => {
      this.emptyItemInstances = this.emptyItemInstances.filter(ite => ite !== emptyItemInstance);
      /**需要处理默认值问题*/
    }
  }

  /**把数据传递出去*/
  private transferChangeValue = (name: string | Object) => {
    if (this.callbacks.onValuesChange) {
      /**触发传递的 onValuesChange 事件*/
      const values = this.getFieldValue()
      if (typeof name === "string") {
        const newValue = cloneByNamePathList(values, [name])
        this.callbacks.onValuesChange?.(newValue, values);
      } else {
        this.callbacks.onValuesChange?.(name, values);
      }
    }
    return this;
  }

  /**更新字段是否隐藏*/
  updatedFieldHideValue = (value: Record<string, boolean>) => {
    // 字段对应的 form item 进行更新
    const names = Object.keys(value || {});
    names.forEach((key) => {
      this.hideState = set(this.hideState, key, value[key])
    })
    this.noticeHide(names);
    return this;
  }


  /**更新字段是否占位*/
  updatedFieldEmptyValue = (value: Record<string, boolean>) => {
    // 字段对应的 form item 进行更新
    const names = Object.keys(value || {});
    names.forEach((key) => {
      this.emptyState = set(this.emptyState, key, value[key])
    })
    this.noticeEmpty(names);
  }

  /**更新字段是否隐藏规则*/
  updatedFieldHideRulesValue = (value: Record<string, boolean>) => {
    // 字段对应的 form item 进行更新
    const names = Object.keys(value || {});
    names.forEach((key) => {
      this.hideRuleState = set(this.hideRuleState, key, value[key])
    })
    this.noticeHide(names);
    names.forEach((name) => {
      const formItemInstance = this.formItemInstances.find(ite => ite.name === name);
      if (formItemInstance && formItemInstance?.rule) {
        formItemInstance.rule?.updatedMessages?.([])
      }
    })
    return this;
  }

  /**更新字段value值
   * 
   * @param name 字段
   * @param value 字段值
   * @param validateType 校验规则处理
   * @param isOnlySave 仅用于存储
   * 
  */
  updatedFieldValue = (name: string, value: any, validateType: "validate" | "clear" | "none" = 'validate', isOnlySave: boolean = false) => {
    // 字段对应的 form item 进行更新
    this.formData = set(this.formData, name, value);
    if (isOnlySave === true) {
      return;
    }
    this.transferChangeValue(name);
    this.notice(name);
    /**验证数据 */
    if (validateType === "validate") {
      this.onlyValidate(name);
    } else if (validateType === 'clear') {
      /**清空验证提示信息*/
      const formItemInstance = this.formItemInstances.find(ite => ite.name === name);
      if (formItemInstance && formItemInstance?.rule) {
        formItemInstance.rule?.updatedMessages?.([])
      }
    }
    return this;
  }

  /**
   * 批量更新字段value值
   * 
   * @param value 更新值
   * @param isTransfer 是否触发 onValuesChange 事件
   * @param isValidate 是否进行验证
   * @param isOnlySave 仅用于存储
   * 
  */
  bathUpdatedFieldValue = (value: any, isTransfer = true, isValidate = true, isOnlySave: boolean = false) => {
    // 字段对应的 form item 进行更新
    const names = Object.keys(value || {});
    names.forEach((key) => {
      this.formData = set(this.formData, key, value[key])
    })
    if (isOnlySave === true) {
      return
    }
    if (isTransfer) {
      this.transferChangeValue(value);
    }
    /**验证数据 */
    if (isValidate) {
      this.onlyValidate(names);
    }
    this.notice(names);
    return this;
  }

  /**获取 formList 实例或者集合*/
  getFormListInstance = (name: string) => {
    return this.formListInstances.get(name);
  }

  /**获取字段值*/
  getFieldValue = (name?: string) => {
    if (name) {
      if (has(this.formData, name)) {
        return get(this.formData, name)
      }
      return undefined
    }
    return this.formData;
  }

  /**获取字段隐藏规则值*/
  getFieldHideRulesValue = (name?: string) => {
    if (name) {
      return get(this.hideRuleState, name)
    }
    return this.hideRuleState;
  }

  /**获取字段隐藏值*/
  getFieldHideValue = (name?: string) => {
    if (name) {
      return get(this.hideState, name)
    }
    return this.hideState;
  }

  /**获取字段隐藏值*/
  getFieldEmptyValue = (name?: string) => {
    if (name) {
      return get(this.emptyState, name)
    }
    return this.emptyState;
  }

  /**通知组件更新*/
  notice = (name?: string | string[]) => {
    /**循环挂载组件*/
    this._bathNotice(this.formItemInstances, name)
    return this;
  }

  /**通知组件隐藏*/
  noticeHide = (name?: string | string[]) => {
    /**循环挂载组件*/
    this._bathNotice(this.hideItemInstances, name)
    return this;
  }

  /**通知组件*/
  noticeEmpty = (name?: string | string[]) => {
    /**循环挂载组件*/
    this._bathNotice(this.emptyItemInstances, name)
  }

  /**通知监听方法*/
  noticeWatch = (name?: string | string[]) => {
    /**循环挂载组件*/
    this._bathNotice(this.formItemInstances, name, true)
    return this;
  }

  /**进行实例更新渲染*/
  private _bathNotice_judge = (item: FormItemInstanceBase | FormHideItemInstanceBase | FormEmptyItemInstanceBase, isWatch?: boolean) => {
    if (isWatch) {
      if (item.isWatch) {
        item.updated?.({})
      }
    } else {
      item.updated?.({})
    }
  }


  /**通知组件基础方法*/
  private _bathNotice = (list: (FormItemInstanceBase | FormHideItemInstanceBase | FormEmptyItemInstanceBase)[], name?: string | string[], isWatch?: boolean) => {
    if (typeof name === "string") {
      /**循环挂载组件*/
      list.forEach((item) => {
        if (item.name === name) {
          this._bathNotice_judge(item, isWatch)
        } else if (Array.isArray(item.dependencies) && item.dependencies.length) {
          const findx = item.dependencies.find(ite => ite === name)
          if (findx) {
            this._bathNotice_judge(item, isWatch)
          }
        }
      })
    } else if (Array.isArray(name)) {
      /**循环挂载组件*/
      list.forEach((item) => {
        if (name.includes(item.name)) {
          this._bathNotice_judge(item, isWatch)
        } else if (Array.isArray(item.dependencies) && item.dependencies.length) {
          const findx = item.dependencies.find(ite => name.includes(ite))
          if (findx) {
            this._bathNotice_judge(item, isWatch)
          }
        }
      })
    } else {
      /**循环挂载组件*/
      list.forEach((item) => {
        this._bathNotice_judge(item, isWatch)
      })
    }
    return this;
  }

  /**
   * 只进行验证，没有返回值
   * */
  onlyValidate = async (name: string | string[]) => {
    try {
      /**校验数据*/
      if (Array.isArray(name)) {
        await this.validate(name)
      } else {
        await this.validate([name])
      }
    } catch (err) {
      console.log(err)
    }
    return this;
  }

  /**仅用于判断是否存在不通过校验的数据*/
  onlyValidateRulesMessage = (names?: string[]): Promise<{ errorFields: ErrorDataField[] }> => {
    return new Promise(async (resolve, reject) => {
      const errorFields: ErrorDataField[] = []
      const notErrorFields: ErrorDataField[] = []
      /**去除 watch 字段*/
      const newFormItemInstances = this.formItemInstances.filter((ite) => !ite.isWatch)
      const lg = newFormItemInstances.length;
      const isNames = Array.isArray(names) && names.length

      for (let index = 0; index < lg; index++) {
        const instanceItem = newFormItemInstances[index];
        /**如果是监听则跳出循环*/
        if (instanceItem.isWatch) {
          /**跳出本次循环*/
          continue;
        }
        /**判断实例是否存在 & 是否需要验证规则*/
        if (instanceItem.rule && instanceItem.rule.isValidate()) {
          let isValidate = true
          if (isNames) {
            /**判断是否存在当前需要验证的项*/
            const findx = names.find((name) => name === instanceItem.name);
            if (!findx) {
              isValidate = false
            }
          }
          try {
            /**判断是否需要进行验证*/
            if (isValidate) {
              await instanceItem.rule.validate(true)
              notErrorFields.push({ errors: [], sort: instanceItem.sort, name: instanceItem.name })
            }
          } catch (errors: any) {
            if (errors) {
              errorFields.push({ errors, sort: instanceItem.sort, name: instanceItem.name })
              break;
            }
          }
        } else {
          notErrorFields.push({ errors: [], sort: instanceItem.sort, name: instanceItem.name })
        }
      }
      /**判断是否存在验证失败的*/
      if (errorFields.length) {
        reject({ errorFields, })
      } else {
        resolve({ errorFields: [] })
      }
    })
  }

  /**规则验证 ，默认不传递验证所有 */
  validate = (names?: string[]) => {
    return new Promise(async (resolve, reject) => {
      const errorFields: ErrorDataField[] = []
      const notErrorFields: ErrorDataField[] = []

      /**去除 watch 字段*/
      const newFormItemInstances = this.formItemInstances.filter((ite) => !ite.isWatch)
      const nameListPath = newFormItemInstances.map((item) => item.name);
      const lg = newFormItemInstances.length;

      const isNames = Array.isArray(names) && names.length

      for (let index = 0; index < lg; index++) {
        const instanceItem = newFormItemInstances[index];
        /**如果是监听则跳出循环*/
        if (instanceItem.isWatch) {
          /**跳出本次循环*/
          continue;
        }
        /**判断实例是否存在 & 是否需要验证规则*/
        if (instanceItem.rule && instanceItem.rule.isValidate()) {
          let isValidate = true
          if (isNames) {
            /**判断是否存在当前需要验证的项*/
            const findx = names.find((name) => name === instanceItem.name);
            if (!findx) {
              isValidate = false
            }
          }
          try {
            /**判断是否需要进行验证*/
            if (isValidate) {
              await instanceItem.rule.validate()
              notErrorFields.push({ errors: [], sort: instanceItem.sort, name: instanceItem.name })
            }
          } catch (errors: any) {
            if (errors)
              errorFields.push({ errors, sort: instanceItem.sort, name: instanceItem.name })
          }
        } else {
          notErrorFields.push({ errors: [], sort: instanceItem.sort, name: instanceItem.name })
        }
      }
      /**所有值*/
      const values = cloneByNamePathList(this.getFieldValue(), nameListPath);
      /**判断是否存在验证失败的*/
      if (errorFields.length) {
        reject({ errorFields, values: values })
      } else {
        resolve(values)
      }
    })
  }

  /**
   * 设置回调函数
  */
  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks
  }

  /**
   * 提交
  */
  submit = async () => {
    try {
      const result = await this.validate()
      if (result) {
        this.callbacks?.onFinish?.(result)
      }
    } catch (error: any) {
      this.callbacks.onFinishFailed?.(error)
    }
  }
}
