import { createRef, useEffect, useRef } from 'react';

export interface SizeInfo {
  width: number;
  height: number;
  offsetWidth: number;
  offsetHeight: number;
}

export class ResizeObserverInstance {
  /**dom节点*/
  dom = createRef<HTMLDivElement>();
  /*更新值*/
  onUpdatedResize?: (size: SizeInfo, target: HTMLDivElement) => void;
  /**是否监听*/
  isListener?: boolean = true;
  /**临时存储*/
  private _temp_size: SizeInfo = {
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1,
  };

  /**节点变化*/
  onSize: ResizeObserverCallback = () => {
    const { width, height } = this.dom.current.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = this.dom.current;
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (
      this._temp_size.width !== fixedWidth ||
      this._temp_size.height !== fixedHeight ||
      this._temp_size.offsetWidth !== offsetWidth ||
      this._temp_size.offsetHeight !== offsetHeight
    ) {
      const size = { width: fixedWidth, height: fixedHeight, offsetWidth, offsetHeight };
      this._temp_size = size;
      const mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
      const mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
      const sizeInfo = {
        ...size,
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight,
      };

      if (this.onUpdatedResize) {
        // defer the callback but not defer to next frame
        Promise.resolve().then(() => {
          this.onUpdatedResize(sizeInfo, this.dom.current);
        });
      }
    }
  };

  /**监听节点*/
  ensureObserver = () => {
    const observer = new ResizeObserver(this.onSize);
    if (this.dom.current && this.isListener) {
      observer.observe(this.dom.current);
    }
    return () => {
      observer.disconnect();
    };
  };
}

interface ResizeObserverOptions {
  /**节点变化*/
  onResize?: ResizeObserverInstance['onUpdatedResize'];
  /**是否监听*/
  isListener?: boolean;
}

/**节点变化*/
export const useResizeObserver = (options: ResizeObserverOptions = {}) => {
  const { isListener = true, onResize } = options;
  const resizeObserverInstance = useRef(new ResizeObserverInstance()).current;
  resizeObserverInstance.onUpdatedResize = onResize;
  resizeObserverInstance.isListener = isListener;

  useEffect(() => {
    const disconnect = resizeObserverInstance.ensureObserver();
    return disconnect;
  }, [resizeObserverInstance.dom, isListener]);

  return resizeObserverInstance;
};
