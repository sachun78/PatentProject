import { useRecoilState } from 'recoil'
import { eventEditState, eventModalState } from '../atoms/eventState'

export function useEventModal() {
  const [open, setOpen] = useRecoilState(eventModalState)
  const [isEdit, setEdit] = useRecoilState(eventEditState)

  return { open, isEdit, setOpen, setEdit }
}
