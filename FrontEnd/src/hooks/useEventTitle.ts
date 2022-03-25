import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  eventEditState,
  eventModalState,
  eventState,
  eventTitleState,
  updateEventEdit,
  updateEventModalOpen,
  updateEventTitle
} from '../atoms/eventState'

export default function useEventTitle() {
  const title = useRecoilValue(eventTitleState)
  const setEventState = useSetRecoilState(eventState)

  const setEventTitle = (value: string) =>
    setEventState((state) => updateEventTitle(state, value))

  return { title, setEventTitle }
}

export function useEventModal() {
  const open = useRecoilValue(eventModalState)
  const isEdit = useRecoilValue(eventEditState)
  const setEventState = useSetRecoilState(eventState)

  const setModalState = (value: boolean) =>
    setEventState((state) => updateEventModalOpen(state, value))
  const setEditState = (value: boolean) =>
    setEventState((state) => updateEventEdit(state, value))

  return { open, isEdit, setModalState, setEditState }
}
