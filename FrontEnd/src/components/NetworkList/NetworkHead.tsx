import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'
import { itemStyle, tabStyle } from '../../pages/Member/style'
import { NavLink } from 'react-router-dom'
import React from 'react'

export type NetworkHeadProps = {}

function NetworkHead({}: NetworkHeadProps) {
  return (
    <div css={HeadStyle}>
      <ul css={tabStyle}>
        <li>
          <NavLink css={itemStyle} to={'my'}>
            Network
          </NavLink>
        </li>
        <li>
          <NavLink css={itemStyle} to={'browse'}>
            Browse
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

const HeadStyle = css`
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 1.25rem;
    color: ${brandColor};
  }

  max-width: 60rem;
  margin-right: 1rem;
  display: flex;
  justify-content: space-between;
`

export default NetworkHead
