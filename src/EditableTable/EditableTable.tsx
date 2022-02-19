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

type Props<T> = {
  columns: TableColumn[]
  rows: T[]
}

const useStyles = makeStyles({
  cell: {
    border: '1px solid #DDDDDD',
    padding: 0,
    boxSizing: 'border-box',
  },
})


export function EditableTable<T>({columns, rows}: Props<T>) {
  const classes = useStyles();
  return <TableContainer component={Paper}>
    <Table size={'small'} style={{width: 'auto'}}>
      <TableHead>
        <TableRow>
          {columns.map(column => <TableCell className={classes.cell} align={'center'}
                                            style={{width: `${column.width}px`}}>{column.title}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {columns.map(column => <TableCell className={classes.cell} style={{width: `${column.width}px`}}
                                              component={column.isHead ? 'th' : 'td'}
                                              align={column.align}
                                              scope="row">{column.renderCell(index)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      {
        columns.some(it => it.renderFootCell !== undefined) &&
        <TableFooter>
          <TableRow>
            {columns.map(column => <TableCell className={classes.cell} align={column.align}
                                              style={{width: `${column.width}px`}}>{column.renderFootCell?.()}</TableCell>)}
          </TableRow>
        </TableFooter>
      }

    </Table>
  </TableContainer>
}
