import { ref, computed } from "vue";

let localId = 0;
export const useHtmlFor = (suffix: string) => {
  const count = ref(localId++)
  return computed(() => {
    return `carefree-form-item_${count.value.toString(32)}_${suffix}`
  })
}
