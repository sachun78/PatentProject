import { useMemo } from 'react'
import { DialogProps } from '../components/Dialog/Dialog'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

type GlobalDialogState = DialogProps

const defaultDialogState: GlobalDialogState = {
  visible: false,
  title: '',
  message: '',
  confirmText: 'OK',
  cancelText: 'CANCEL',
  onConfirm() {
  },
  onCancel: undefined,
  isDestructive: false
}

const globalDialogState = atom({
  default: defaultDialogState,
  key: 'globalDialogState'
})

export function useGlobalDialogValue() {
  return useRecoilValue(globalDialogState)
}

type OpenDialogParams = Omit<GlobalDialogState, 'visible' | 'onConfirm'> & {
  onConfirm?(): void
  showCancel?: boolean
}

export function useGlobalDialogActions() {
  const set = useSetRecoilState(globalDialogState)
  return useMemo(
    () => ({
      open(params: OpenDialogParams) {
        set({
          ...defaultDialogState,
          ...params,
          onCancel:
            params.onCancel ?? (params.showCancel ? () => {
            } : undefined),
          visible: true
        })
      },
      close() {
        set((prev) => ({ ...prev, visible: false }))
      }
    }),
    [set]
  )
}
