import { css } from '@emotion/react'
import palette from 'lib/palette'

export const noScheduleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  svg {
    width: 33%;
    height: 33%;
    margin-top: 5rem;
    min-width: 20rem;
  }

  div {
    margin-top: 10px;
    font-size: 3rem;
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
    border-radius: 12px !important;
    height: 24px !important;
    padding: 4px 0 !important;
    font: normal normal 800 15px 'NanumSquare' !important;
    line-height: 1.133333333 !important;

    background-color: #a1045a !important;
    color: #fff !important;

    &:disabled {
      background-color: ${palette.grey[900]} !important;
      color: ${palette.grey[400]} !important;
    }
  }

  .fc-daygrid-day-number {
    padding: 0.5rem 0.5rem 0.25rem !important;
    color: #6c6c6c;
    font: normal normal 800 15px 'NanumSquare';
    line-height: 1.133333333;
  }

  .fc-col-header {
    background: #d9d9d9;
    color: #6c6c6c;
    font: normal normal normal 17px NanumSquareOTF;
    line-height: 1.117647059;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 1.125rem !important;
  }

  .fc-day-past,
  .fc-day-future {
    background: #fff;
  }

  .fc-prev-button,
  .fc-next-button {
    background: transparent !important;
    width: 24px !important;
    height: 24px !important;
    padding: 0 !important;
    border-radius: 1rem !important;

    span {
      color: #6c6c6c !important;
      margin-bottom: 0.3rem;
    }
  }

  .fc .fc-toolbar-title {
    color: #6c6c6c;
    font: normal normal normal 20px NanumSquareOTF;
    line-height: 1.15;
  }

  max-width: 80.3125rem;
  max-height: 42.9375rem;
  padding: 1.875rem;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  background: rgba(255, 255, 255, 0.7);
`

export const labelStyle = css`
  .MuiTypography-root {
    color: #6c6c6c;
    font: normal normal normal 17px/19px NanumSquareOTF !important;
  }
`
