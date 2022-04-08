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
  margin-top: 1.5625rem;
  height: 100%;
`

export const calendarStyle = css`
  .fc-today-button {
    width: 73px !important;
    border-radius: 12px !important;
    height: 24px !important;
    padding: 4px 0 !important;
    font: normal normal 800 15px 'NanumSquare' !important;
    line-height: 1.133333333 !important;

    background-color: #A1045A !important;
    color: #fff !important;

    &:disabled {
      background-color: ${palette.grey[900]} !important;
      color: ${palette.grey[400]} !important;
    }
  }

  .fc-daygrid-day-number {
    padding: 0.5rem 0.5rem 0.25rem !important;
    color: #6C6C6C;
    font: normal normal 800 15px 'NanumSquare';
    line-height: 1.133333333;
  }

  .fc-col-header {
    background: #D9D9D9;
    color: #6C6C6C;
    font: normal normal normal 17px NanumSquareOTF;
    line-height: 1.117647059;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 1.125rem !important;
  }

  .fc-day-past, .fc-day-future {
    background: #fff;
  }

  .fc-prev-button, .fc-next-button {
    background: #9C9C9C !important;
    width: 19px !important;
    height: 19px !important;
    padding: 0 !important;
  }

  .fc .fc-toolbar-title {
    color: #6C6C6C;
    font: normal normal normal 20px NanumSquareOTF;
    line-height: 1.15;
  }

  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
  max-width: 80.3125rem;
  max-height: 42.9375rem;
  padding: 1.875rem;
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;
  background: rgba(255, 255, 255, 0.7);
`
