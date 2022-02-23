import { LocalizationProvider, StaticTimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import InputBase from '../InputBase'
import { css } from '@emotion/react'
import { useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { TextField } from '@mui/material'

export type TimePickerProps = {
  value: Date,
  onChange(value: Date): void
}

function TimePickerInput({ value, onChange }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }

  const handleChange = (new_value: Date | null) => {
    if (new_value) {
      if (value.getMinutes() !== new_value.getMinutes()) {
        onChange(new_value)
        setOpen(false)
      }
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
      {value?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>

    {open && <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div css={calendarStyle}>
        <StaticTimePicker ampm={true}
                          ampmInClock={true}
                          orientation='portrait'
                          openTo='hours'
                          value={value}
                          onAccept={(new_value) => {
                            if (new_value) {
                              onChange(new_value)
                              setOpen(false)
                            }
                          }}
                          onChange={handleChange}
                          minutesStep={5}
                          displayStaticWrapperAs='desktop'
                          showToolbar={false}
                          renderInput={(params) => <TextField {...params} />} />
      </div>
    </LocalizationProvider>}
  </InputBase>
}

const wrapper = css`
  position: relative;
  width: 100%;
  max-width: 16rem;
`

const textStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-left: 1.6rem;
  padding-right: 1.6rem;

  &:focus-visible {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  }
`

const calendarStyle = css`
  position: absolute;
  background: white;
  z-index: 5;
  bottom: -0.1rem;

  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  transform: translate3d(0, 100%, 0);
`

export default TimePickerInput
