import _Layout from './layout.vue';
import _LayoutFormItem from './layout.formItem.vue';
import _FormLayoutRows from './layout.form.rows.vue';
import { withInstall } from '../utils';

export const Layout = withInstall(_Layout);
export const LayoutFormItem = withInstall(_LayoutFormItem);
export const FormLayoutRows = withInstall(_FormLayoutRows);
