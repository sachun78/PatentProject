import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import React from 'react'
import useSelectMenu from '../../hooks/useSelectMenu'

type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  const { current, setCurrent } = useSelectMenu()

  const handleClick = (e: any) => {
    console.log('click ', e)

    // conference는 메뉴 선택 없이 링크로 이동하도록 함
    if (e.key && e.key.indexOf('conf') !== -1) {
      return
    }
    setCurrent(e.key)
  }
  return (
    <div css={baseStyle}>
      <Link to={'/membership'}>MemberShip</Link>
      <Link to={'/schedule'}>Schedule</Link>
      <Link to={'/network'}>Network</Link>
    </div>
  )
}

const baseStyle = css`
  align-items: center;
  justify-content: center;
  display: flex;

  padding-bottom: 12rem;
  flex-direction: column;

  .username {
    font-weight: 600;
    font-size: 1.125rem;
    margin-top: 1rem;
    text-align: center;
    a {
      color: #1e1e0c;
    }
    :hover {
      text-decoration: underline;
      user-select: none;
      cursor: pointer;
    }
  }
`

export default Sidebar
