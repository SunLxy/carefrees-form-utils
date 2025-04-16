import { FormItemBaseInstance } from "./formItemBaseInstance"
export class FormHideItemInstanceBase extends FormItemBaseInstance {
  /**初始化方法*/
  ctor = (name: string) => {
    this.name = name
    return this;
  }
}