import { ref, computed, Ref } from 'vue';

let localId = 0;
export const useHtmlFor = (suffix: Ref<string>) => {
  const count = ref(localId++);
  return computed(() => {
    return `carefree-vue-form-item_${count.value.toString(32)}_${suffix.value}`;
  });
};
