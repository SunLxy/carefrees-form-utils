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
  /**监听多少行*/
  onGapRow?: (row: number, col: number, target: HTMLDivElement) => void;
  /**内容大小变化*/
  onResize?: (size: SizeInfo, target: HTMLDivElement) => void;
  /**内容*/
  children?: React.ReactNode;
}

const preCls = 'carefrees-form-layout-body';

/**布局组件-内容区域*/
export const FormLayoutBody = React.memo((props: FormLayoutBodyProps) => {
  const { colCount = 4, children, className, style, gap, onResize } = props;

  const propsRef = useRef(props);
  propsRef.current = props;
  const bodyCls = useMemo(() => clx(preCls, className), [className]);
  const _tempGapRowColRef = useRef<{ row?: number; col: number }>({ row: undefined, col: undefined });
  const resizeObserverInstance = useResizeObserver({ onResize, isListener: !!(typeof onResize === 'function') });
  const calculateGapRow = useCallback((col: number) => {
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
        if (_tempGapRowColRef.current.row === rowCount && _tempGapRowColRef.current.col === colCount) {
          return;
        }
        _tempGapRowColRef.current = {
          row: rowCount,
          col: colCount,
        };
        propsRef.current.onGapRow(rowCount, col, resizeObserverInstance.dom.current);
      } catch (error) {
        console.log('计算行数失败', error);
      }
    }
  }, []);
  useEffect(() => {
    calculateGapRow(colCount);
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
