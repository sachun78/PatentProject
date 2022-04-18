import { CalendarPicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import InputBase from '../InputBase'
import { css } from '@emotion/react'
import { useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'

export type DatePickerProps = {
  value: Date,
  maximum?: Date,
  minimum?: Date,
  onChange(value: Date): void
}

function DatePickerInput({ value, maximum, minimum, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }

  const handleChange = (value: Date | null) => {
    if (value) {
      onChange(value)
      setOpen(false)
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }
  useOnClickOutside(ref, onClose)

  return <InputBase css={wrapper} ref={ref}>
    <div
      css={textStyle}
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (['Enter', 'Space'].includes(e.key)) {
          handleOpen()
        }
      }}>
      {value?.toDateString()}
    </div>

    {open && <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker date={value} onChange={handleChange} css={calendarStyle} minDate={minimum} maxDate={maximum} />
    </LocalizationProvider>}
  </InputBase>
}

const wrapper = css`
  position: relative;
  width: 100%;
`

const textStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus-visible {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  }
`

const calendarStyle = css`
  position: absolute;
  background: white;
  z-index: 99;
  bottom: -0.1rem;
  max-width: 293px;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  transform: translate3d(0, 100%, 0);
`

export default DatePickerInput
