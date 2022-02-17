import { EventInput } from '@fullcalendar/react'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let LastStr = new Date('2022-02-22').toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: LastStr,
    backgroundColor: '#257e4a'
  },
  {
    id: createEventId(),
    title: 'All-day 2 event',
    start: todayStr,
    end: '2022-02-19',
    backgroundColor: 'red'
  }
]

export function createEventId() {
  return String(eventGuid++)
}
