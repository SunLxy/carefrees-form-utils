import { onMounted, onUnmounted, ref } from 'vue';

/**挂载卸载*/
export const useEffect = (fun: () => Function | undefined) => {
  const unRegisterRef = ref();
  onMounted(() => {
    unRegisterRef.value = fun();
  });
  onUnmounted(() => {
    typeof unRegisterRef.value === 'function' && unRegisterRef.value();
    unRegisterRef.value = undefined;
  });
};
