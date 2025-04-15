import { FormItemBaseInstance } from "./formItemBaseInstance"

export class FormEmptyItemInstanceBase extends FormItemBaseInstance {
  /**初始化方法*/
  ctor = (name: string, updated: Function, dependencies?: string[]) => {
    this.name = name
    this.updated = updated
    this.dependencies = dependencies || []
    return this;
  }
}