
import type { FormInstanceBase } from "./formInstance"
import { cloneByNamePathList } from "../utils"
import { ValidateErrorEntity } from "../interface"

export class MultipleInstanceBase {

  private instanceMap: Map<string, FormInstanceBase> = new Map([])
  /**
   * 注册表单实例
   * @param name 表单名称
   * @param form 表单实例
  */
  ctor = (name: string, form: FormInstanceBase) => {
    this.instanceMap.set(name, form)
    return () => {
      this.instanceMap.delete(name)
    }
  }
  /**
   * 获取表单实例
   * @param name 表单名称
  */
  getInstance = (name?: string) => {
    if (name) {
      return this.instanceMap.get(name)
    }
    return this.instanceMap
  }

  /**
   * 验证表单规则
   * @param namePath 表单名称(如果不传递表单名称,则验证所有表单)
   * 
   * @example
  */
  validate = (namePath?: string | string[] | Record<string, string[]>) => {
    return new Promise(async (resolve, reject) => {
      const listFormErrors: Record<string, ValidateErrorEntity> = {}
      let isSuccess = true
      let nameKeys: string[] = [];
      let isObject = false
      if (namePath) {
        if (Array.isArray(namePath)) {
          nameKeys = namePath;
        } else if (Object.prototype.toString.call(namePath) === '[object Object]') {
          isObject = true
          nameKeys = Object.keys(namePath)
        } else {
          nameKeys = [namePath] as string[]
        }
      } else {
        nameKeys = Array.from(this.instanceMap.keys());
      }

      const lg = nameKeys.length
      for (let index = 0; index < lg; index++) {
        const name = nameKeys[index];
        const form = this.instanceMap.get(name)
        try {
          if (form) {
            const paths = isObject ? (namePath as Record<string, string[]>)[name] : undefined
            const result = await form.validate(paths)
            listFormErrors[name] = { errorFields: [], values: result }
          }
        } catch (errs: any) {
          isSuccess = false
          listFormErrors[name] = errs
        }
      }
      /**成功抛出数据*/
      if (isSuccess) {
        resolve(listFormErrors)
      } else {
        /**失败抛出数据*/
        reject(listFormErrors)
      }
    })

  }
  /**
   * 获取表单中值
   * @param name 表单名称 (不存在时，获取所有表单值)
   * @param path 字段路径 (不存在的时候直接获取对应表单所有值)
   * 
  */
  getFormFieldValue = (name?: string, dataField?: string | string[]) => {
    if (!name) {
      const data: Record<string, unknown> = {}
      this.instanceMap.forEach((form, key) => {
        data[key] = form.getFieldValue()
      })
      return data
    }
    const form = this.instanceMap.get(name)
    if (form) {
      if (typeof dataField === "string") {
        return { [name]: form.getFieldValue(dataField) }
      }
      if (dataField) {
        const formData = form.getFieldValue()
        const data = cloneByNamePathList(formData, dataField)
        return { [name]: data }
      }
    }
    return { [name]: {} }
  }
}
