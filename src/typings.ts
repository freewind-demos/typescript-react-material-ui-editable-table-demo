import {ReactNode} from 'react';
import {CSSProperties} from 'react';

export type TableColumn = {
  title?: string,
  renderCell: (index: number) => ReactNode,
  renderFootCell?: () => ReactNode,
  isHead?: boolean,
  width?: number,
  cellStyles?: {
    base?: CSSProperties,
    head?: CSSProperties,
    body?: CSSProperties,
    foot?: CSSProperties,
  }
}

