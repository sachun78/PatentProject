import { useState } from 'react'

export default function useModal() {
  const [open, setOpen] = useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = (e: object, reason: string) => {
    if (reason === 'backdropClick') return
    setOpen(false)
  }

  return {
    open,setOpen, handleClose
  }
}
