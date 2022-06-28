import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'

export const calendarStyle = css`
  .fc-today-button {
    width: 73px !important;
    padding: 4px 0 !important;
    font: normal normal 800 15px 'NanumSquare' !important;

    background-color: #a1045a !important;
    color: #fff !important;

    &:not(:disabled):hover {
      background-color: #fff !important;
      color: ${brandColor} !important;
    }
  }

  .fc-toolbar-chunk > div,
  .fc-toolbar-chunk {
    display: flex;
  }

  .fc-daygrid-day-number {
    padding: 0.5rem 0.5rem 0.25rem !important;
    color: #6c6c6c;
    font: normal normal 800 15px NanumSquareOTF;
    line-height: 1.133333333;
  }

  .fc-col-header {
    background: #910457;
    color: #fff;
    font: normal normal 800 15px/17px NanumSquareOTF;
  }

  .fc-col-header-cell {
    padding: 4.5px;
    //min-height: 30px;
  }

  .fc-day-past,
  .fc-day-future {
    background: #fff;
  }

  .fc-prev-button,
  .fc-next-button {
    width: 24px !important;
    height: 24px !important;
    padding: 0 !important;
    border-color: ${brandColor} !important;
    background-color: ${brandColor} !important;

    span {
      color: #fff !important;
      margin-bottom: 0.3rem;
    }

    &:hover {
      background-color: #fff !important;

      span {
        color: ${brandColor} !important;
      }
    }
  }

  .fc .fc-daygrid-event {
    padding-left: 0.625rem !important;
    margin-top: 6px !important;

    //border-collapse: collapse !important;
    font-size: 0.75rem !important;
    font-weight: normal !important;
    color: #6c6c6c !important;
    line-height: 1.461538462rem !important;

    &:hover {
      cursor: pointer !important;
    }
  }

  .fc-event-title {
    padding: 0 !important;
  }

  .fc-day-today {
    background: #ffebe8 !important;

    .fc-daygrid-day-number {
      color: ${brandColor} !important;
    }
  }

  .fc-direction-ltr .fc-daygrid-event.fc-event-end {
    margin-right: 1rem !important;
    border-top-right-radius: 1rem !important;
    border-bottom-right-radius: 1rem !important;
  }

  .fc-event-start {
    margin-left: 1rem !important;
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
  }

  .fc-icon-chevron-left:before {
    position: relative;
    bottom: 1px;
    right: 1px;
  }

  .fc-icon-chevron-right:before {
    position: relative;
    bottom: 1px;
  }

  .fc .fc-toolbar-title {
    color: ${brandColor};
    font: normal normal 800 18px/21px NanumSquareOTF;
    margin-left: 15px;
  }

  max-width: 76.25rem;
  max-height: 43.1875rem;
  padding: 2rem 1.875rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: -2.875rem;

  tbody > tr > td.fc-daygrid-day:first-of-type,
  table {
    border-left: none !important;
  }

  .fc .fc-scrollgrid-section-liquid > td,
  .fc-col-header-cell:last-of-type,
  tbody > tr > td.fc-daygrid-day:last-of-type {
    border-right: none !important;
  }

  .fc-timeGridDay-button,
  .fc-dayGridMonth-button {
    background-color: #a1045a !important;
  }
`
