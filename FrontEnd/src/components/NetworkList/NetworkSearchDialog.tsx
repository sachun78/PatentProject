import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useNetworkModalState } from '../../atoms/networkState'
import { useCallback } from 'react'
import SearchIcon from '@mui/icons-material/Search'

export type NetworkSearchDialogProps = {}

function NetworkSearchDialog({}: NetworkSearchDialogProps) {
  const [open, setOpen] = useNetworkModalState()

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    console.log('submit')
  }, [])
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <form onSubmit={onSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="search-network"
            label="Keyword"
            type="text"
            placeholder={'email or name or country anything...'}
            fullWidth
            variant="standard"
            InputProps={{ endAdornment: <SearchIcon /> }}
          />
          <button type={'submit'} style={{ display: 'none' }} />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NetworkSearchDialog
