import { Drawer } from '@mui/material'

export type HistoryDrawerProps = {
  open: boolean
  onClose: () => void
}

function HistoryDrawer({ open, onClose }: HistoryDrawerProps) {
  return <Drawer
    anchor={'right'}
    open={open}
    onClose={onClose}
    sx={{ width: '100%' }}
  >
    <div style={{ width: '60rem' }}>MY drawer</div>
  </Drawer>
}

export default HistoryDrawer
