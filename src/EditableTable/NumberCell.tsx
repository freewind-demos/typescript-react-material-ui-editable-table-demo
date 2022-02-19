import React, {useEffect} from 'react';
import {FC} from 'react';
import {KeyboardEvent} from 'react';
import {useRef} from 'react';
import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Input} from '@material-ui/core';

const useStyles = makeStyles({
  textField: {
    border: 0,
    background: 'transparent',
    width: '100%',
    height: 32,
    padding: 4,
    margin: 0,
    color: '#333333',
    '&:hover': {
      background: '#EDF0F1'
    },
    '&.Mui-focused': {
      border: '1px solid #0C78D2'
    }
  },
  invalidNumber: {
    color: 'red'
  }
})

type Props = {
  value: number
  updateValue: (value: number) => void
}

export const NumberCell: FC<Props> = ({value, updateValue}) => {
  const classes = useStyles()
  const cellRef = useRef<HTMLTableCellElement>()

  const [text, setText] = useState(value.toString())

  useEffect(() => {
    setText(value.toString())
  }, [value])

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    console.log('### event.key', event.key)
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      console.log("### cellRef.current", cellRef.current)
      cellRef.current?.querySelector('input')?.blur();
      updateValue(Number(text))
    }
  }

  return <Input className={`${classes.textField} ${Number.isNaN(Number(text)) ? classes.invalidNumber : ''}`}
                disableUnderline
                ref={cellRef} onKeyDown={handleKeyDown}
                onChange={(e) => setText(e.target.value)} value={text}/>

}
