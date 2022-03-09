import { css } from '@emotion/react'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import InputBase from '../InputBase'
import LocationMap from './LocationMap'

// function LocationInput() {
//     return(
//         <Input
//             placeholder='Add a location'
//             name='place'
//             // value={form.place}
//             // onChange={onChange}
//           />
//     );
// }



export type LocationInputProps = {
    address: String,
    onChange(address: String): void    
  }
  
  function LocationInput({ address, onChange }: LocationInputProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
  

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
        {address}
      </div>
  
      {open && <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div css={calendarStyle}>
          <LocationMap address={address}/>          
        </div>
      </LocalizationProvider>}
    </InputBase>
  }
  
  const wrapper = css`
    position: relative;
    width: 100%;
    max-width: 40rem;
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


export default LocationInput