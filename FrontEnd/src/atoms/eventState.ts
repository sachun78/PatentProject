import { atom, selector, useRecoilState } from 'recoil'
import produce from 'immer'

export type EventState = {
  dateRange: {
    startDate: Date
    endDate: Date
  }
  open: boolean
  isEdit: boolean
}

const initialState: EventState = {
  dateRange: {
    startDate: new Date(),
    endDate: new Date()
  },
  open: false,
  isEdit: false
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

export const eventEditState = selector<EventState['isEdit']>({
  key: 'eventEditState',
  get: ({ get }) => {
    const event = get(eventState)
    return event.isEdit
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

export const updateEventModalOpen = (
  state: EventState,
  value: boolean
) =>
  produce(state, (draft) => {
    draft.open = value
  })

export const updateEventEdit = (
  state: EventState,
  value: boolean
) =>
  produce(state, (draft) => {
    draft.isEdit = value
  })
