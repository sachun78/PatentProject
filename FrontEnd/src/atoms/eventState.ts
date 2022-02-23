import { atom, selector, useRecoilState } from 'recoil'
import produce from 'immer'

export type EventState = {
  title: string
  dateRange: {
    startDate: Date
    endDate: Date
  }
  open: boolean
}

const initialState: EventState = {
  title: '',
  dateRange: {
    startDate: new Date(),
    endDate: new Date()
  },
  open: false
}

export const eventState = atom({
  key: 'eventState',
  default: initialState
})

const currentEventState = atom({
  key: 'currentEventState',
  default: {
    id: '',
    title: ''
  }
})

export function useCurrentEventState() {
  return useRecoilState(currentEventState)
}

export const eventTitleState = selector<EventState['title']>({
  key: 'eventTitleState',
  get: ({ get }) => {
    const event = get(eventState)
    return event.title
  }
})

export const dateRangeState = selector<EventState['dateRange']>({
  key: 'dateRangeState',
  get: ({ get }) => {
    const event = get(eventState)
    return event.dateRange
  }
})

export const eventModalState = selector<EventState['open']>({
  key: 'eventModalState',
  get: ({ get }) => {
    const event = get(eventState)
    return event.open
  }
})

export const updateDateRange = (
  state: EventState,
  key: keyof EventState['dateRange'],
  value: Date
) =>
  produce(state, (draft) => {
    draft.dateRange[key] = value
  })

export const updateEventTitle = (
  state: EventState,
  value: string
) =>
  produce(state, (draft) => {
    draft.title = value
  })

export const updateEventModalOpen = (
  state: EventState,
  value: boolean
) =>
  produce(state, (draft) => {
    draft.open = value
  })
