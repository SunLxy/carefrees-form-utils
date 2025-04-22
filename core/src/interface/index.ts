export interface MessageType {
  /**信息*/
  message?: string;
  [s: string]: unknown;
}

export interface ErrorDataField {
  /**字段*/
  name: string;
  /**排序*/
  sort?: string;
  /**错误信息*/
  errors: MessageType[];
}

export interface ValidateErrorEntity<Values = any> {
  /*值*/
  values: Values;
  /**错误信息*/
  errorFields: ErrorDataField[];
}

export interface Callbacks<Values = any> {
  /**值更新触发*/
  onValuesChange?: (changedValues: any, values: Values) => void;
  /**提交保存 验证成功*/
  onFinish?: (values: Values) => void;
  /**提交保存 验证失败*/
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}
/**更新表单项操作类型*/
export type UpdatedOptType = 'restValues';
