import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import {TableColumn} from '../typings';
import {makeStyles} from '@material-ui/core/styles';
import {STYLE_CONSTS} from './STYLE_CONSTS';

type Props<T> = {
  columns: TableColumn<T>[]
  rows: T[]
}

const useStyles = makeStyles(() => ({
  row: {
    height: STYLE_CONSTS.row.height,
  },
  headCell: {
    border: '1px solid #DDDDDD',
    padding: '2px 4px',
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 14,
  },
  bodyCell: {
    border: '1px solid #DDDDDD',
    padding: '2px 4px',
    color: '#333333',
    fontSize: 12,
  },
  footCell: {
    border: '1px solid #DDDDDD',
    padding: '2px 4px',
    fontWeight: 'bold',
    color: '#555555',
    fontSize: 14,
  }
}))


export function EditableTable<T>({columns, rows}: Props<T>) {
  const styles = useStyles();
  return <TableContainer component={Paper}>
    <Table size={'small'} style={{width: 'auto'}}>
      <TableHead>
        <TableRow className={styles.row}>
          {columns.map((column, index) => <TableCell key={index} className={styles.headCell}
                                                     component={'th'}
                                                     width={column.width}
                                                     style={{...column.cellStyles?.base, ...column.cellStyles?.head}}>{column.title}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex} className={styles.row}>
            {columns.map((column, colIndex) => <TableCell key={colIndex} className={styles.bodyCell}
                                                          style={{...column.cellStyles?.base, ...column.cellStyles?.body}}
                                                          width={column.width}
                                                          component={column.isHead ? 'th' : 'td'}
                                                          scope="row">{column.renderCell(rows, rowIndex)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      {
        columns.some(it => it.renderFootCell !== undefined) &&
        <TableFooter>
          <TableRow className={styles.row}>
            {columns.map((column, index) => <TableCell key={index} className={styles.footCell} component={'th'}
                                                       width={column.width}
                                                       style={{...column.cellStyles?.base, ...column.cellStyles?.foot}}>{column.renderFootCell?.(rows)}</TableCell>)}
          </TableRow>
        </TableFooter>
      }

    </Table>
  </TableContainer>
}
