import styled from '@emotion/styled'
import { brandColor } from 'lib/palette'

export const CalendarContainer = styled.div`
  .fc-view {
    //overflow-x: auto;
  }

  .fc-view > table thead th:first-of-type {
    position: sticky !important;
    left: 0 !important;
    z-index: 2 !important;
  }

  .fc-timegrid-col.fc-day.fc-day-past {
    border: 1px solid #999999;
    background-color: #cccccc;
  }

  // theme start
  /* Styling for each event from Schedule */

  .fc-time-grid-event.fc-v-event.fc-event {
  }

  /* Bolds the name of the event and inherits the font size */

  .fc-event {
    font-size: inherit !important;
    font-weight: bold !important;
  }

  .fc-event-time,
  .fc-event-title {
    padding: 0 1px !important;
    white-space: normal !important;
  }

  /* Remove the header border from Schedule */

  .fc td,
  .fc th {
    border-width: 1px !important;
    padding: 0 !important;
    vertical-align: top !important;
  }

  .fc-day-today {
    background: #fff !important;
  }

  .fc-next-button,
  .fc-prev-button {
    background: ${brandColor} !important;
  }
`
