import { useEffect, useMemo, useRef, useState } from "react"
import { FormInstanceBase } from "@carefrees/form-utils"
import { useFormInstance } from "./useForm"
import { useFormItem } from "./useFormItem"

export class WatchInstanceBase {
  /**监听字段*/
  name: string
  /**表单实例*/
  form: FormInstanceBase
  /**老值*/
  oldValue: any
  /**更新值*/
  dispatch: (value: any) => void
  /**回调*/
  callBack?: (value: any, form: FormInstanceBase) => void
  /**更新*/
  updated = () => {
    // 如果上一次和当前相等，则不进行更新
    const newValue = this.form.getFieldValue(this.name);
    if (this.oldValue === newValue) {
      /**相同不进行更新*/
      return;
    }
    if (this.callBack) {
      this.callBack(newValue, this.form)
    } else {
      this.dispatch(newValue)
    }
  }
}

/**
 * 字段监听
*/
export const useWatch = (name: string, form: FormInstanceBase, callBack?: (value: any, form: FormInstanceBase) => void) => {
  const formInstance = form || useFormInstance()
  const [oldValue, setValue] = useState(formInstance.getFieldValue(name))
  const watch = useRef(new WatchInstanceBase()).current;
  watch.oldValue = oldValue;
  watch.dispatch = setValue
  watch.callBack = callBack
  watch.form = formInstance

  const formItemInstance = useFormItem()
  useMemo(() => formItemInstance.ctor(name), []);
  formItemInstance.instance = formInstance
  formItemInstance.isWatch = true;
  formItemInstance.updated = watch.updated

  useEffect(() => {
    const unMount = formInstance.registerFormItem(formItemInstance);
    return () => unMount();
  }, [])
  return [oldValue, formInstance, watch] as [any, FormInstanceBase, WatchInstanceBase]
}
