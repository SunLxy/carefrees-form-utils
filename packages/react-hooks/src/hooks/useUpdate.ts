import { useState, useRef } from 'react';

/**更新页面状态*/
export const useUpdate = () => {
  const [, _update] = useState({});
  /**为了防止 hooks 闭包问题*/
  const refUpdate = useRef<Function>(() => void 0);
  refUpdate.current = () => {
    _update({});
  };
  return refUpdate;
};
