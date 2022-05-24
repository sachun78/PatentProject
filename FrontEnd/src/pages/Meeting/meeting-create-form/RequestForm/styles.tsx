import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const wrapper = css`
  margin-right: 2rem;
  min-width: 50%;
  width: 24rem;
  max-width: 24rem;
`
export const sectionStyle = css`
  display: flex;
  flex-direction: column;
  & > h1 {
    color: #333;
    font: normal normal 800 20px NanumSquareOTF;
    margin-bottom: 0.75rem;
  }
`

export const buttonStyle = css`
  height: 1.75rem;
  width: 12.5rem;
  text-transform: none;
  align-self: center;
  border-radius: 1rem;
  font: normal normal normal 14px/26px NanumSquareOTF;
`

export const PeriodBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8125rem;

  svg {
    margin-right: 0.5rem;
  }

  span {
    font: normal normal normal 1rem/26px NanumSquareOTF;
    color: #6c6c6c;
  }
`
