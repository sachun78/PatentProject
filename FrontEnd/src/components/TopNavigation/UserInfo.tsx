import { css } from '@emotion/react'
import React from 'react'
import palette from '../../lib/palette'
import useToggle from '../../hooks/useToggle'
import {
  MdArrowDropDown
} from 'react-icons/md'
import CategoryPicker from './UserInfoPicker'
import { BiUser } from 'react-icons/bi'
export type UserInfoProps = {}

function UserInfo({}: UserInfoProps) {
  const [categoryPicker, toggleCategoryPicker] = useToggle(false)

  return <div css={wrapper}>
    <div css={HomeTabStyle} onClick={toggleCategoryPicker}>
      <BiUser />
      <MdArrowDropDown />
    </div>

    <CategoryPicker onClose={toggleCategoryPicker} visible={categoryPicker} />
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
