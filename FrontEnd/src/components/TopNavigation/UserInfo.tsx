import { css } from '@emotion/react'
import React, { useRef} from 'react'
import { useUserState } from '../../atoms/authState'
import useAuth from '../../hooks/useAuth'
import palette from '../../lib/palette'
import useToggle from '../../hooks/useToggle'
import {
  MdArrowDropDown
} from 'react-icons/md'
import CategoryPicker from './UserInfoPicker'
import { BiUser } from "react-icons/bi";

export type UserInfoProps = {}

function UserInfo({}: UserInfoProps) {
  const [user] = useUserState()
  const { logout } = useAuth()
  const username: string = user?.username || ''
  const [categoryPicker, toggleCategoryPicker] = useToggle(false)
  const timeframeRef = useRef<HTMLDivElement | null>(null)
  const selectItem =[[0, username], [1, 'logout']]

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if (!timeframeRef.current) return
    if (
      e.target === timeframeRef.current ||
      timeframeRef.current.contains(e.target as Node)
    ) {
      return
    }
    toggleCategoryPicker()
  }

  return <div css={wrapper}>
    <div css={HomeTabStyle} onClick={toggleCategoryPicker} ref={timeframeRef} >
      <BiUser />      
      <MdArrowDropDown />
    </div>

    <CategoryPicker onClose={onClose} visible={categoryPicker} />
  </div>
}

const wrapper = css`
  flex-grow: 1;
  flex-shrink: 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2rem;
  
`

const logoutStyle = css`
  margin-left: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  font-weight: 600;  
`
const HomeTabStyle = css`
  background: ${palette.grey[50]};  
  height: 3.2rem;
  width: 9.6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-weight: 600;
  color: ${palette.blueGrey[600]};
  font-size: 1.4rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.75;
    }
  }
  `

export default UserInfo
