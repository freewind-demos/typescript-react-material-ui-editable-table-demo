import React from 'react'
import {useState} from 'react';
import {useCallback} from 'react';

import './hello.pcss';
import {TableColumn} from './typings';
import {EditableTable} from './EditableTable/EditableTable';
import {NumberInputCell} from './EditableTable/NumberInputCell';

import DeleteIcon from '@material-ui/icons/Delete';
import {sum} from './utils';
import {Button} from '@material-ui/core';
import {useMemo} from 'react';

type Row = {
  project: string,
  sun: number,
  mon: number,
  tue: number,
  wed: number,
  thu: number,
  fri: number,
  sat: number
};


export default function MyTable() {
  const [rows, setRows] = useState<Row[]>([
    {project: 'project 1', sun: 0, mon: 6, tue: 4, wed: 2, thu: 4, fri: 3, sat: 0},
    {project: 'project 2', sun: 0, mon: 2, tue: 5, wed: 2, thu: 5, fri: 1, sat: 0},
    {project: 'project 3', sun: 0, mon: 4, tue: 2, wed: 2, thu: 4, fri: 3, sat: 0},
    {project: 'project 4', sun: 0, mon: 2, tue: 8, wed: 2, thu: 4, fri: 3, sat: 0},
  ]);

  function updateRow(index: number, rowChanges: Partial<Row>) {
    setRows(rows => {
      const newRows = [...rows];
      newRows.splice(index, 1, {...newRows[index], ...rowChanges})
      return newRows
    })
  }

  function deleteRow(index: number) {
    setRows(rows => {
      const newRows = [...rows];
      newRows.splice(index, 1)
      return newRows;
    })
  }

  const EditableCell = useCallback(({
                                      index,
                                      field
                                    }: { index: number, field: Extract<keyof Row, 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'> }) => {
    return <NumberInputCell value={rows[index][field]}
                            updateValue={v => updateRow(index, {[field]: v})}/>
  }, [rows])

  function rowTotal(index: number) {
    const row = rows[index];
    console.log("### row", {rows, index})
    return row.sun + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat;
  }

  const bodyColumns: TableColumn[] = useMemo(() => [
    {
      title: 'Project',
      width: 200,
      renderCell: (index) => rows[index].project, isHead: true,
      cellStyles: {
        base: {
          minWidth: 150,
          padding: '2px 4px'
        }
      }
    },
    {
      title: 'Sun 02/13',
      width: 100,
      renderCell: (index) => <EditableCell index={index} field='sun'/>,
      renderFootCell: () => sum(rows.map(it => it.sun)).toString(),
      cellStyles: {body: {padding: 0}},
    },
    {
      title: 'Mon 02/14',
      width: 100,
      renderCell: (index) => <EditableCell index={index} field='mon'/>,
      renderFootCell: () => sum(rows.map(it => it.mon)).toString(),
      cellStyles: {body: {padding: 0}},
    },
    {
      title: 'Tue 02/15',
      width: 100,
      renderCell: (index) => <EditableCell index={index} field='tue'/>,
      renderFootCell: () => sum(rows.map(it => it.tue)).toString(),
      cellStyles: {body: {padding: 0}},
    },
    {
      title: 'Wed 02/16', width: 100,
      renderCell: (index) => <EditableCell index={index} field='wed'/>,
      renderFootCell: () => sum(rows.map(it => it.wed)).toString(),
      cellStyles: {body: {padding: 0}},
    },
    {
      title: 'Thu 02/17', width: 100,
      renderCell: (index) => <EditableCell index={index} field='thu'/>,
      renderFootCell: () => sum(rows.map(it => it.thu)).toString(),
      cellStyles: {body: {padding: 0}},
    },
    {
      title: 'Fri 02/18', width: 100,
      renderCell: (index) => <EditableCell index={index} field='fri'/>,
      renderFootCell: () => sum(rows.map(it => it.fri)).toString(),
      cellStyles: {body: {padding: 0}},
    },
    {
      title: 'Sat 02/19', width: 100,
      renderCell: (index) => <EditableCell index={index} field='sat'/>,
      renderFootCell: () => sum(rows.map(it => it.sat)).toString(),
      cellStyles: {body: {padding: 0}},
    },
    {
      title: 'Week Total', width: 100,
      renderCell: (rowIndex) => rowTotal(rowIndex),
      cellStyles: {
        base: {
          fontWeight: 'bold'
        }
      },
    },
    {title: '', renderCell: (index) => <DeleteIcon onClick={() => deleteRow(index)}/>}
  ], [rows]);

  return <div className={'MyTable'}>
    <EditableTable<Row> columns={bodyColumns} rows={rows}/>
    <Button variant={'contained'} onClick={() => setRows(rows => [...rows, {
      project: '',
      sun: 0,
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0
    },])}>Add new row</Button>
  </div>
}
