import { css } from '@emotion/react'
import { Calendar } from 'antd'
import moment from 'moment'
import { useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'

type DataPickerProps = {
  visible?: boolean
  onClose: Parameters<typeof useOnClickOutside>[1]
  value: moment.Moment
  onChange: (date: moment.Moment)=> void
  onExit: () => void
}

export default function DataPicker({ visible, onClose, value, onChange,onExit }: DataPickerProps) {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, onClose)

  const onSelect = (data: moment.Moment) => {
    onChange(data)
    onExit()
  }

  if (!visible) return null
  return (
    <div css={pickerStyle} ref={ref}>
      <Calendar
        fullscreen={false}
        mode="month"
        value={value}
        onChange={onSelect}
      />
    </div>
  )
}

const pickerStyle = css`
  bottom: -0.0625rem;
  left: 0;
  width: 18rem;
  position: absolute;
  background: white;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  transform: translate3d(0, 100%, 0);
  z-index: 5;
  overflow: hidden;
`
