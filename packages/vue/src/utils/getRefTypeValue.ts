
import { isRef, Ref } from 'vue';

export type RefBaseType<T> = Ref<T> | T;

export const getRefTypeValue = <T>(val: RefBaseType<T>) => {
  return isRef(val) ? val.value : val;
}