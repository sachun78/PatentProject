import { atom, selector, useRecoilState } from 'recoil'
import produce from 'immer'

type dateRange = {
  startDate: Date
  endDate: Date
}

export type EventState = {
  dateRange: dateRange
  open: boolean
  isEdit: boolean
}

const initialState: EventState = {
  dateRange: {
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(24, 0, 0, 0)),
  },
  open: false,
  isEdit: false,
}

export const eventState = atom({
  key: 'eventState',
  default: initialState,
})

export type CurrentEventState = {
  id: string
  title: string
}

export const eventSelectModalState = atom({
  key: 'eventSelectModalState',
  default: false,
})

const currentEventState = atom<CurrentEventState>({
  key: 'currentEventState',
  default: {
    id: '',
    title: '',
  },
})

export function useCurrentEventState() {
  return useRecoilState(currentEventState)
}

export const dateRangeState = selector<EventState['dateRange']>({
  key: 'dateRangeState',
  get: ({ get }) => {
    const event = get(eventState)
    return event.dateRange
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object')
      set(
        eventState,
        produce((event) => {
          event.dateRange = newValue
        })
      )
  },
})

export const eventModalState = selector<EventState['open']>({
  key: 'eventModalState',
  get: ({ get }) => {
    const event = get(eventState)
    return event.open
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'boolean')
      set(
        eventState,
        produce((event) => {
          event.open = newValue
        })
      )
  },
})

export const eventEditState = selector<EventState['isEdit']>({
  key: 'eventEditState',
  get: ({ get }) => {
    const event = get(eventState)
    return event.isEdit
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'boolean')
      set(
        eventState,
        produce((event) => {
          event.isEdit = newValue
        })
      )
  },
})
