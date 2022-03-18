import { css } from '@emotion/react'
import React, { memo } from 'react'
import Logo from './Logo'
import UserInfo from './UserInfo'

type TopNavigationProps = {}

function TopNavigation({}: TopNavigationProps) {

  return (
    <div css={wrapper}>
      <Logo />
      <UserInfo />
    </div>
  )
}

const wrapper = css`
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 100%;
  background: #f7f7f8;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`

export default memo(TopNavigation)
