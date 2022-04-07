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
    &:disabled {
      background-color: ${palette.grey[900]} !important;
      color: ${palette.grey[400]} !important;
    }

    background-color: ${palette.purple[900]} !important;
    color: ${palette.grey[100]} !important;
  }

  margin-top: 1.5625rem;
  max-width: 80.3125rem;
  padding: 1.875rem;
  background: rgba(255, 255, 255, 0.5);
`
