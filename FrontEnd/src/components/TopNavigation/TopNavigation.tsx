import { css } from '@emotion/react'
import React from 'react'
import Logo from './Logo'
import UserInfo from './UserInfo'
import SearchTab from './SearchTab'

type TopNavigationProps = {}

function TopNavigation({}: TopNavigationProps) {

  return (
    <div css={wrapper}>
      <Logo />
      <SearchTab />
      <UserInfo />
    </div>
  )
}

const wrapper = css`
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 100%;
`

export default TopNavigation
