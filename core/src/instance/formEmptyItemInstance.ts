import { FormItemBaseInstance } from "./formItemBaseInstance"

export class FormEmptyItemInstanceBase extends FormItemBaseInstance {
  /**初始化方法*/
  ctor = (dataField: string, updated: Function, dependencies?: string[]) => {
    this.dataField = dataField
    this.updated = updated
    this.dependencies = dependencies || []
    return this;
  }
}