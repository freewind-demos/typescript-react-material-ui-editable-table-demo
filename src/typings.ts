import {ReactNode} from 'react';
import {CSSProperties} from 'react';

export type TableColumn<T> = {
  title?: string,
  renderCell: (rows: T[], index: number) => ReactNode,
  renderFootCell?: (rows: T[]) => ReactNode,
  isHead?: boolean,
  width?: number,
  cellStyles?: {
    base?: CSSProperties,
    head?: CSSProperties,
    body?: CSSProperties,
    foot?: CSSProperties,
  }
}

