import { FormItemBaseInstance } from './formItemBaseInstance';
import { RuleInstanceBase } from './ruleIntsnace';
import { FormItemInstanceBase } from './formItemInstance';

export class FormListInstanceBase extends FormItemBaseInstance {
  /**规则*/
  rule?: RuleInstanceBase;
  /**表单实例*/
  formItemInstance?: FormItemInstanceBase;
  /**父级字段*/
  parentDataField?: string;
  /**记录key值*/
  keys: number[] = [];
  /**累加数据，唯一性*/
  id: number = 0;
  /**
   * 初始化
   * @param name 字段
   */
  ctor = (name: string) => {
    this.name = name;
    return this;
  };

  /**获取值*/
  getLastValue = () => {
    const value = this.instance?.getFieldValue?.(this.name);
    /**对值进行处理*/
    const lastValue = Array.isArray(value) ? value : [];
    return lastValue;
  };

  /**
   * 添加一条
   * @param initialValue 初始值
   * @param unshift 是否加入数组前面
   */
  onAdd = (initialValue: Object = {}, unshift?: boolean) => {
    /**获取值*/
    const value = this.getLastValue();
    if (unshift) {
      const listData = [initialValue || {}, ...value];
      this.keys = [this.id, ...this.keys];
      this.id++; // 累加
      this.instance?.updatedFieldValue?.(this.name, listData);
    } else {
      const listData = [...value, initialValue || {}];
      this.keys = [...this.keys, this.id];
      this.id++; // 累加
      this.instance?.updatedFieldValue?.(this.name, listData);
    }
  };

  /**
   * 删除
   * @param index 删除数据下标
   */
  onDelete = (index: number | number[]) => {
    /**获取值*/
    const value = this.getLastValue();
    const newIndexs = Array.isArray(index) ? index : [index];
    this.keys = this.keys.filter((_, index) => !newIndexs.includes(index));
    const listData = value.filter((_, index) => !newIndexs.includes(index));
    this.instance?.updatedFieldValue?.(this.name, listData);
  };

  /**移动*/
  onMove = (from: number, to: number) => {
    /**从那个移动到那个*/
    const newList = this.getLastValue();
    const fromItem = newList[from];
    const toItem = newList[to];
    newList[from] = toItem;
    newList[to] = fromItem;
    this.instance?.updatedFieldValue?.(this.name, [...newList]);
  };

  /**更新某个item数据*/
  updatedItem = (index: number, item: any) => {
    const newList = this.getLastValue();
    const newItem = newList[index];
    newList[index] = { ...newItem, ...item };
    this.instance?.updatedFieldValue?.(this.name, [...newList]);
  };

  /**获取渲染 list 字段拼接*/
  getFields = () => {
    const values = this.getLastValue();
    return values.map((__, index) => {
      let key = this.keys[index];
      if (key === undefined) {
        this.keys[index] = this.id;
        key = this.keys[index];
        this.id++; // 累加
      }
      return {
        name: index,
        key,
      };
    });
  };
}
