import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const wrapper = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`
export const titleStyle = css`
  display: flex;
  max-width: 54.375rem;
  img {
    width: 0.8125rem;
    height: 0.875rem;
    margin-right: 0.3125rem;
  }
  h2 {
    color: #910457;
    font: normal normal 800 18px/21px NanumSquareOTF;
  }
  padding-bottom: 1.5625rem;
  border-bottom: 1px solid #9c9c9c;
  margin-bottom: 1.5625rem;
`
export const InfoStyleDiv = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 54.375rem;
`
