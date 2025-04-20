import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { LayoutBodyBaseStyled } from '../styles/styles.layout';
import clx from 'classnames';
import { useResizeObserver, SizeInfo } from './../hooks/useResizeObserver';
export interface FormLayoutBodyProps {
  className?: string;
  style?: React.CSSProperties;
  /**列数据*/
  colCount?: number;
  /**
   * @description gap 属性是用来设置网格行与列之间的间隙，该属性是row-gap and column-gap的简写形式。
   */
  gap?: string | number;
  /**
   * 获取多少行
   */
  onGapRow?: (row: number, col: number, target: HTMLDivElement) => void;
  /**内容大小变化*/
  onResize?: (size: SizeInfo, target: HTMLDivElement) => void;
  /**内容*/
  children?: React.ReactNode;
}

const preCls = 'carefrees-form-layout-body';

/**布局组件-内容区域*/
export const FormLayoutBody = React.memo((props: FormLayoutBodyProps) => {
  const { colCount = 4, children, className, style, gap, onResize, onGapRow } = props;

  const propsRef = useRef(props);
  propsRef.current = props;

  const colCountRef = useRef(colCount);
  colCountRef.current = colCount;

  const bodyCls = useMemo(() => clx(preCls, className), [className]);
  const _tempGapRowColRef = useRef<{ row?: number; col: number }>({ row: undefined, col: undefined });
  const _tempPreBodyHeightRef = useRef(0); // 上一次容器高度

  const onResizeHandler = useCallback((size: SizeInfo) => {
    if (typeof propsRef.current.onResize === 'function') {
      propsRef.current.onResize(size, resizeObserverInstance.dom.current);
    }
    if (typeof propsRef.current.onGapRow === 'function') {
      // 判断高度变化
      if (_tempPreBodyHeightRef.current !== size.height) {
        /**如果高度进行变化了，则进行计算*/
        calculateGapRow();
      }
    }
  }, []);

  const isListener = typeof onResize === 'function' || typeof onGapRow === 'function';

  const resizeObserverInstance = useResizeObserver({ onResize: onResizeHandler, isListener: !!isListener });

  /**计算子集行数*/
  const calculateGapRow = useCallback(() => {
    if (typeof propsRef.current.onGapRow === 'function' && resizeObserverInstance.dom.current) {
      // 计算行数
      try {
        const childrens = [...resizeObserverInstance.dom.current.children] as HTMLElement[];
        const rowOffsets = new Set();
        for (let item of childrens) {
          if (item) {
            const offsetTop = item?.offsetTop;
            rowOffsets.add(offsetTop);
          }
        }
        const rowCount = rowOffsets.size;
        if (_tempGapRowColRef.current.row === rowCount && _tempGapRowColRef.current.col === colCountRef.current) {
          return;
        }
        _tempGapRowColRef.current = {
          row: rowCount,
          col: colCountRef.current,
        };
        propsRef.current.onGapRow(rowCount, colCountRef.current, resizeObserverInstance.dom.current);
      } catch (error) {
        console.log('计算行数失败', error);
      }
    }
  }, []);

  useEffect(() => {
    calculateGapRow();
  }, [colCount, resizeObserverInstance.dom]);

  return (
    <LayoutBodyBaseStyled
      ref={resizeObserverInstance.dom}
      $gap={gap}
      style={style}
      className={bodyCls}
      $colCount={colCount}
    >
      {children}
    </LayoutBodyBaseStyled>
  );
});
