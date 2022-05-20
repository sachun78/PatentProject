import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const wrapper = css`
  height: 100%;
  flex: 1;
  text-align: center;
  display: flex;
  flex-wrap: wrap;

  &:hover,
  &:focus {
    cursor: pointer;
  }
`

export const noScheduleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 76.25rem;
  height: 530px;

  h1 {
    font: normal normal 800 16px/18px NanumSquareOTF;
    color: #6c6c6c;
    margin: 0;
  }

  border: 1px solid #9c9c9c;
  border-radius: 16px;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  margin-right: 1rem;
  max-height: 50px;
`
