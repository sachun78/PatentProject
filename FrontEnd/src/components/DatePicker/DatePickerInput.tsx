import { css } from '@emotion/react'
import { useRef, useState } from 'react'
import DatePicker from '.'
import InputBase from '../InputBase'
import useOnClickOutside from 'use-onclickoutside'
import moment from 'moment'

type DatePickerInputProps = {
  value: moment.Moment
  onChange: (date: moment.Moment) => void
}

export default function DatePickerInput({
  value,
  onChange
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }

  return (
    <InputBase css={wrapper} ref={ref}>
      <div
        css={textStyle}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (['Enter', 'Space'].includes(e.key)) {
            handleOpen()
          }
        }}
        tabIndex={0}
      >
        {moment(value).format('YYYY-MM-DD')}
      </div>
      <DatePicker visible={open} onClose={onClose} value={value} onExit={handleClose} />
    </InputBase>
  )
}

const wrapper = css`
  flex: 1;
  width: 16rem;
`

const textStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
  &:focus-visible {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  }
`
