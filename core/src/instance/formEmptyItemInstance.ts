import { FormItemBaseInstance } from "./formItemBaseInstance"

export class FormEmptyItemInstanceBase extends FormItemBaseInstance {
  /**初始化方法*/
  ctor = (name: string) => {
    this.name = name
    return this;
  }
}