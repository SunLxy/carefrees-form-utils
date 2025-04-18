
import { isRef, Ref } from 'vue';

export * from './withInstall';

export const getRefTypeValue = <T>(val: T | Ref<T>) => {
  return isRef(val) ? val.value : val;
}