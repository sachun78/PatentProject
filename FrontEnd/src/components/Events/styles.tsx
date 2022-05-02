import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'
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
  align-items: flex-start;
  justify-content: center;

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
    color: ${brandColor};
    user-select: none;
    text-align: center;
  }
`

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);
  padding: 0.25rem 0 0 1rem;
  border-radius: 0.5rem;
`
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
