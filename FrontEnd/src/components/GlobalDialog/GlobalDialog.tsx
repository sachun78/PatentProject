import { useGlobalDialogActions, useGlobalDialogValue } from '../../atoms/globalDialogState'
import Dialog from '../Dialog'

export type GlobalDialogProps = {}

function GlobalDialog({}: GlobalDialogProps) {
  const { close } = useGlobalDialogActions()
  const { onConfirm, onCancel, ...rest } = useGlobalDialogValue()

  const handleConfirm = () => {
    close()
    onConfirm()
  }
  const handleCancel = onCancel
    ? () => {
      close()
      onCancel()
    }
    : undefined
  return <Dialog {...rest} onConfirm={handleConfirm} onCancel={handleCancel} />
}

export default GlobalDialog
