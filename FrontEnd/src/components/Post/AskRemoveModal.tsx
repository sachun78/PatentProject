import AskModal from './AskModal'

type askRemoveModalProps = {
  visible: boolean
  onConfirm?: any
  onCancel?: any
}

const AskRemoveModal = ({
  visible,
  onConfirm,
  onCancel,
}: askRemoveModalProps) => {
  return (
    <AskModal
      visible={visible}
      title="Delete Post"
      description="Do you want to delete?"
      confirmText="Delete"
      onConfirm={onConfirm}
      onCancel={onCancel}
      cancelText="Cancel"
    />
  )
}

export default AskRemoveModal
