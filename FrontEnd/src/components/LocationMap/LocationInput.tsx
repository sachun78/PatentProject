import { css } from '@emotion/react'
import { useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import InputBase from '../InputBase'
import LocationMap from './LocationMap'

export type locationInputProps = {
  value: string
  onChange(value: any): void
}

function LocationInput({ value, onChange }: locationInputProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [address, setAddress] = useState(value)

  const getLocation = (newLoc: any) => {
    setAddress(newLoc)
    onChange(newLoc)
    setOpen(false)
  }

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  useOnClickOutside(ref, onClose)

  return (
    <InputBase css={wrapper} ref={ref}>
      <div
        css={textStyle}
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (['Enter', 'Space'].includes(e.key)) {
            handleOpen()
          }
        }}
      >
        {address}
      </div>

      {open && (
        <div css={calendarStyle}>
          <LocationMap location={address} getLocation={getLocation} />
        </div>
      )}
    </InputBase>
  )
}

const wrapper = css`
  position: relative;
  width: 100%;
`

const textStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  padding-left: 1.25rem;
  padding-right: 1.25rem;

  &:focus-visible {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  }
`

const calendarStyle = css`
  position: absolute;
  background: white;
  z-index: 10;
  top: 0.1rem;
  transform: translate3d(0, -100%, 0);
  height: 30rem;
`

export default LocationInput
