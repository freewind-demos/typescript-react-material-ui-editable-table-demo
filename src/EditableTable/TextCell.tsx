import React from 'react';
import {FC} from 'react';
import {STYLE_CONSTS} from './STYLE_CONSTS';

type Props = {
  value: string
}

export const TextCell: FC<Props> = ({value}) => {
  return <span style={{padding: STYLE_CONSTS.cell.padding}}>{value}</span>
}
