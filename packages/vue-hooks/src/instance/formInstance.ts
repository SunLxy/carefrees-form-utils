import { FormListInstanceBase } from './formListInstance';
import { FormItemInstanceBase } from './formItemInstance';
import { ErrorDataField, ValidateErrorEntity } from '../interface';
import { get, set, cloneByNamePathList, has } from './../utils';
import { Ref, ref, toValue } from 'vue';

/**基础实例*/
export class FormInstanceBase<T = any> {
  /**表单数据*/
  formData: Ref<Partial<T>> = ref({});
  /**表单每一项实例*/
  formItemInstances: Ref<FormItemInstanceBase>[] = [];
  /**表单中List实例集合*/
  formListInstances: Map<string, Ref<FormListInstanceBase>> = new Map([]);

  // ======================================隐藏组件=====================================
  /**隐藏组件字段对应的值*/
  hideState: Ref<Record<string, boolean>> = ref({});

  /**是否保护值(不进行表单项组件卸载重置初始值)*/
  preserve?: boolean = true;

  //===================================挂载方法====================================================
  /**提交保存 验证成功*/
  onFinish?: (values: T) => void;
  /**提交保存 验证失败*/
  onFinishFailed?: (errorInfo: ValidateErrorEntity<T>) => void;

  /**
   * 重置字段数据值
   */
  resetFieldsValue = (initial: Partial<T> = {}) => {
    this.formData.value = Object.assign(this.formData.value, initial);
    return this;
  };

  /**注册一个 formIList 实例*/
  registerFormList = (name: string, itemInstance: Ref<FormListInstanceBase>) => {
    this.formListInstances.set(name, itemInstance);
    return () => {
      this.formListInstances.delete(name);
    };
  };

  /**注册一个 formItem 实例*/
  registerFormItem = (itemInstance: Ref<FormItemInstanceBase>) => {
    this.formItemInstances.push(itemInstance);
    return () => {
      const instanceItem = toValue(itemInstance);
      this.formItemInstances = this.formItemInstances.filter((ite) => ite !== itemInstance);
      let preserve = this.preserve;
      if (instanceItem?.preserve === false) {
        preserve = instanceItem.preserve;
      }
      const name = `${instanceItem?.name}`;
      const formData = toValue(this.formData);
      // 判断路径是否存在
      if (name && has(formData, name) && !preserve) {
        this.formData.value = set(formData, instanceItem.name, undefined);
      }
    };
  };

  /**更新字段是否隐藏*/
  updatedFieldHideValue = (value: Record<string, boolean>) => {
    // 字段对应的 form item 进行更新
    const names = Object.keys(value || {});
    names.forEach((key) => {
      this.hideState.value = set(this.hideState.value, key, value[key]);
    });
    return this;
  };

  /**更新字段value值
   *
   * @param name 字段
   * @param value 字段值
   * @param validateType 校验规则处理
   * @param isOnlySave 仅用于存储
   *
   */
  updatedFieldValue = (name: string, value: any, validateType: 'validate' | 'clear' | 'none' = 'validate') => {
    // 字段对应的 form item 进行更新
    this.formData.value = set(this.formData.value, name, value);
    /**验证数据 */
    if (validateType === 'validate') {
      this.onlyValidate(name);
    } else if (validateType === 'clear') {
      /**清空验证提示信息*/
      const formItemInstance = this.formItemInstances.find((ite) => ite.value.name === name);
      const instanceItem = toValue(formItemInstance);
      const instanceItemRule = toValue(instanceItem?.rule);
      if (instanceItemRule) {
        instanceItemRule?.updatedMessages?.([]);
      }
    }
    return this;
  };

  /**获取 formList 实例或者集合*/
  getFormListInstance = (name: string) => {
    return this.formListInstances.get(name);
  };

  /**获取字段值*/
  getFieldValue = (name?: string) => {
    const fromData = toValue(this.formData);
    if (name) {
      if (has(fromData, name)) {
        return get(fromData, name);
      }
      return undefined;
    }
    return fromData;
  };

  /**获取字段隐藏值*/
  getFieldHideValue = (name?: string) => {
    const hideData = toValue(this.hideState);
    if (name) {
      return get(hideData, name);
    }
    return hideData;
  };

  /**
   * 只进行验证，没有返回值
   * */
  onlyValidate = async (name: string | string[]) => {
    try {
      /**校验数据*/
      if (Array.isArray(name)) {
        await this.validate(name, false);
      } else {
        await this.validate([name], false);
      }
    } catch (err) {
      console.log(err);
    }
    return this;
  };

  /**规则验证 ，默认不传递验证所有 */
  validate = (names?: string[], isGetAllData: boolean = true): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      const errorFields: ErrorDataField[] = [];
      const notErrorFields: ErrorDataField[] = [];

      /**去除 watch 字段*/
      const newFormItemInstances = this.formItemInstances;
      const nameListPath = newFormItemInstances.map((item) => item.value.name);
      const lg = newFormItemInstances.length;
      const isNames = Array.isArray(names) && names.length;
      for (let index = 0; index < lg; index++) {
        const instanceItemRef = newFormItemInstances[index];
        const instanceItem = toValue(instanceItemRef);
        const rule = toValue(instanceItem.rule);
        /**判断实例是否存在 & 是否需要验证规则*/
        if (rule && rule.isValidate()) {
          let isValidate = true;
          if (isNames) {
            /**判断是否存在当前需要验证的项*/
            const findx = names.find((name) => name === instanceItem.name);
            if (!findx) {
              isValidate = false;
            }
          }
          try {
            /**判断是否需要进行验证*/
            if (isValidate) {
              await rule.validate();
              notErrorFields.push({
                errors: [],
                sort: instanceItem.sort,
                name: instanceItem.name,
              });
            }
          } catch (errors: any) {
            if (errors)
              errorFields.push({
                errors,
                sort: instanceItem.sort,
                name: instanceItem.name,
              });
          }
        } else {
          notErrorFields.push({
            errors: [],
            sort: instanceItem.sort,
            name: instanceItem.name,
          });
        }
      }
      /**所有值*/
      const values = isGetAllData ? (cloneByNamePathList(this.getFieldValue(), nameListPath) as T) : ({} as T);
      /**判断是否存在验证失败的*/
      if (errorFields.length) {
        reject({ errorFields, values: values });
      } else {
        resolve(values);
      }
    });
  };

  /**
   * 提交
   */
  submit = async () => {
    try {
      const result = await this.validate();
      if (result) {
        this?.onFinish?.(result);
      }
    } catch (error: any) {
      this.onFinishFailed?.(error);
    }
  };
}
