import {ReactNode} from 'react';

export type TableColumn = {
  title?: string,
  renderCell: (index: number) => ReactNode,
  renderFootCell?: () => ReactNode,
  isHead?: boolean,
  width?: number,
  align?: 'left' | 'right' | 'center'
}

