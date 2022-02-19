import React from 'react'
import {useState} from 'react';
import {useCallback} from 'react';

import './hello.pcss';
import {TableColumn} from './typings';
import {EditableTable} from './EditableTable/EditableTable';
import {NumberCell} from './EditableTable/NumberCell';

import DeleteIcon from '@material-ui/icons/Delete';
import {sum} from './utils';

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
    return <NumberCell value={rows[index][field]}
                       updateValue={v => updateRow(index, {[field]: v})}/>
  }, [rows])

  function rowTotal(index: number) {
    const row = rows[index];
    return row.sun + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat;
  }

  const bodyColumns: TableColumn[] = [
    {title: 'Project', renderCell: (index) => rows[index].project, isHead: true, width: 100},
    {
      title: 'Sun 02/13',
      renderCell: (index) => <EditableCell index={index} field='sun'/>,
      width: 100,
      renderFootCell: () => sum(rows.map(it => it.sun))
    },
    {
      title: 'Mon 02/14',
      renderCell: (index) => <EditableCell index={index} field='mon'/>,
      width: 100,
      renderFootCell: () => sum(rows.map(it => it.mon))
    },
    {
      title: 'Tue 02/15',
      renderCell: (index) => <EditableCell index={index} field='tue'/>,
      width: 100,
      renderFootCell: () => sum(rows.map(it => it.tue))
    },
    {
      title: 'Wed 02/16',
      renderCell: (index) => <EditableCell index={index} field='wed'/>,
      width: 100,
      renderFootCell: () => sum(rows.map(it => it.wed))
    },
    {
      title: 'Thu 02/17',
      renderCell: (index) => <EditableCell index={index} field='thu'/>,
      width: 100,
      renderFootCell: () => sum(rows.map(it => it.thu))
    },
    {
      title: 'Fri 02/18',
      renderCell: (index) => <EditableCell index={index} field='fri'/>,
      width: 100,
      renderFootCell: () => sum(rows.map(it => it.fri))
    },
    {
      title: 'Sat 02/19',
      renderCell: (index) => <EditableCell index={index} field='sat'/>,
      width: 100,
      renderFootCell: () => sum(rows.map(it => it.sat))
    },
    {
      title: 'Week Total', renderCell: (index) => rowTotal(index), width: 100
    },
    {title: '', renderCell: (index) => <DeleteIcon onClick={() => deleteRow(index)}/>, width: 100}
  ]

  return <div className={'MyTable'}>
    <EditableTable<Row> columns={bodyColumns} rows={rows}/>
  </div>
}
