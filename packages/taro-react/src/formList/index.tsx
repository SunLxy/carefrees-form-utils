import { useRegisterFormList, RegisterFormListOptions } from './../hooks/register/register.FormList';
import { FormListInstanceContext } from '../hooks/useFormList';
import { FormItemParentNameProvider } from './../hooks/useFormItemParentName';
import { RuleInstanceBase, FormItemInstanceBase, FormListInstanceBase } from '@carefrees/form-utils';
import { useRegisterFormHideItem } from './../hooks/register/register.FormHideItem';
import React, { Fragment, memo } from 'react';

export interface FormListChildrenProps {
  /**数据集合*/
  fields: { name: number; key: number }[];
  /**添加*/
  onAdd: (initialValue?: Object) => void;
  /**删除*/
  onDelete: (index: number | number[]) => void;
  /**移动*/
  onMove: (from: number, to: number) => void;
}

export interface FormListProps extends RegisterFormListOptions {
  children: (
    options: FormListChildrenProps,
    instances: {
      ruleInstance: RuleInstanceBase;
      formItemInstance: FormItemInstanceBase;
      formListInstance: FormListInstanceBase;
    },
  ) => React.ReactNode;
}

/**form list 组件*/
export const FormList = memo((props: FormListProps) => {
  const { children, ...rest } = props;
  const { formListInstance, ruleInstance, formItemInstance } = useRegisterFormList(rest);
  return (
    <FormListInstanceContext.Provider value={formListInstance}>
      <FormItemParentNameProvider name={formListInstance.name} sort={formListInstance.sort}>
        {children(
          {
            fields: formListInstance.getFields(),
            onAdd: formListInstance.onAdd,
            onDelete: formListInstance.onDelete,
            onMove: formListInstance.onMove,
          },
          { ruleInstance, formItemInstance, formListInstance },
        )}
      </FormItemParentNameProvider>
    </FormListInstanceContext.Provider>
  );
});

/**隐藏 form list item 组件*/
export const FormHideList = memo((props: FormListProps) => {
  const { name, sort, isJoinParentField } = props;
  const { isHide } = useRegisterFormHideItem({ name, sort: sort, isJoinParentField });
  if (isHide) {
    return <Fragment />;
  }
  return <FormList {...props} />;
});
