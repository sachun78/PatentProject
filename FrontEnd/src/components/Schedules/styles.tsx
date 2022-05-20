import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'

export const noScheduleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 60%;

  svg {
    width: 33%;
    height: 33%;
    margin-top: 5rem;
    min-width: 20rem;
  }

  div {
    margin-top: 10px;
    font-size: 2rem;
    font-weight: 600;
    color: ${palette.purple[600]};
    user-select: none;
  }
`

export const tableStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
  flex-direction: row;
`

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
    padding-top: 1px !important;
    padding-bottom: 1px !important;
    margin-top: 6px !important;
    border-collapse: collapse !important;
    font-size: 0.6875rem !important;
    font-weight: 400 !important;
    font-family: Rubik, sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
    line-height: 1.25rem !important;

    &:hover {
      cursor: pointer !important;
    }
  }

  .fc-day-today {
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
    margin-right: 15px;
  }

  max-width: 76.25rem;
  max-height: 43.1875rem;
  padding: 2rem 1.875rem;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  background: rgba(255, 255, 255, 0.7);
  position: relative;
  top: -2.875rem;
`
