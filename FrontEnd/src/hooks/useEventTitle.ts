import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  eventModalState,
  eventState,
  eventTitleState,
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
  const setEventState = useSetRecoilState(eventState)

  const setModalState = (value: boolean) =>
    setEventState((state) => updateEventModalOpen(state, value))

  return { open, setModalState }
}
