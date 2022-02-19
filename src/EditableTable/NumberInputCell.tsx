import React, {useEffect} from 'react';
import {FC} from 'react';
import {KeyboardEvent} from 'react';
import {useRef} from 'react';
import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Input} from '@material-ui/core';
import {STYLE_CONSTS} from './STYLE_CONSTS';

const useStyles = makeStyles({
  textField: {
    border: 0,
    background: 'transparent',
    width: '100%',
    height: STYLE_CONSTS.row.height,
    padding: STYLE_CONSTS.cell.padding,
    margin: 0,
    fontSize: 12,
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

function isValidNumber(text: string): boolean {
  return !Number.isNaN(Number(text))
}

export const NumberInputCell: FC<Props> = React.memo(({value, updateValue}) => {
    console.log("### > NumberInputCell", value)
    const classes = useStyles()
    const cellRef = useRef<HTMLTableCellElement>()

    const [text, setText] = useState(value.toString())

    useEffect(() => {
      setText(value.toString())
    }, [value])

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      console.log("event.key", event.key);
      if (event.key === 'Enter' || event.key === 'Escape') {
        event.preventDefault();
        cellRef.current?.querySelector('input')?.blur();
        if (isValidNumber(text)) {
          updateValue(Number(text));
        }
      }
    }

    return <Input tabIndex={1}
                  className={`${classes.textField} ${isValidNumber(text) ? '' : classes.invalidNumber}`}
                  disableUnderline
                  ref={cellRef} onKeyDown={handleKeyDown}
                  onBlur={(event) => {
                    console.log('### blur')
                    if (isValidNumber(text)) {
                      updateValue(Number(text));
                    }
                  }}
                  onChange={(e) => setText(e.target.value)} value={text}/>

  }
)
