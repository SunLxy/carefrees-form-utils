import { FormItemBaseInstance } from './formItemBaseInstance';
export class FormHideItemInstanceBase extends FormItemBaseInstance {
  /**初始化方法*/
  ctor = (name: string) => {
    this.name = name;
    return this;
  };
  /**上次是否隐藏值*/
  preHideValue?: boolean;

  /**更新当前组件方法*/
  updatedItem?: Function;

  /**判读更新是否隐藏还是显示*/
  updated: Function = () => {
    const newHideValue = this.instance?.getFieldHideValue(this.name);
    if (!!newHideValue !== !!this.preHideValue) {
      this.updatedItem?.({});
    }
  };
}
