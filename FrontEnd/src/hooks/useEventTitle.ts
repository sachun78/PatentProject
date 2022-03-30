import { useRecoilValue, useSetRecoilState } from 'recoil'
import { eventEditState, eventModalState, eventState, updateEventEdit, updateEventModalOpen } from '../atoms/eventState'

export function useEventModal() {
  const open = useRecoilValue(eventModalState)
  const isEdit = useRecoilValue(eventEditState)
  const setEventState = useSetRecoilState(eventState)

  const setOpen = (value: boolean) =>
    setEventState((state) => updateEventModalOpen(state, value))
  const setEdit = (value: boolean) =>
    setEventState((state) => updateEventEdit(state, value))

  return { open, isEdit, setOpen, setEdit }
}
