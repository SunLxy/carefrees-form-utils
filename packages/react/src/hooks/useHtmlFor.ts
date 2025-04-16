import { useMemo, useRef } from "react";

let localId = 0;
export const useHtmlFor = (suffix: string) => {
  const count = useRef(localId++)
  return useMemo(() => {
    return `carefree-form-item_${count.current.toString(32)}_${suffix}`
  }, [count.current, suffix])
}
