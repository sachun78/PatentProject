import { useState } from 'react'

export default function useModal(initialState: boolean) {
  const [open, setOpen] = useState(initialState)
  const handleClose = (e: object, reason: string) => {
    if (reason === 'backdropClick') return
    setOpen(false)
  }

  return {
    open, setOpen, handleClose
  }
}
