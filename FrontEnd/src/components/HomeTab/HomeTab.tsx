import { css } from '@emotion/react'
import palette from '../../lib/palette'
import {
  MdArrowDropDown
} from 'react-icons/md'
import React, { useRef, useState } from 'react'
import useToggle from '../../hooks/useToggle'
import CategoryPicker from './CategoryPicker'

export type HomeTabProps = {} & React.HTMLAttributes<HTMLDivElement>

const selectItem = [[0, '12'], [1, '23'], [2, '56'], [3, '78']]

function HomeTab({}: HomeTabProps) {
  const [categoryPicker, toggleCategoryPicker] = useToggle(false)
  const [select, setSelect] = useState(0)
  const timeframeRef = useRef<HTMLDivElement | null>(null)

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
    <div css={HomeTabStyle} onClick={toggleCategoryPicker} ref={timeframeRef}>
      {selectItem.find((t) => t[0] === select)![1]}{' '}
      <MdArrowDropDown />
    </div>
    <CategoryPicker onClose={onClose} visible={categoryPicker} />
  </div>
}

const wrapper = css`
  display: flex;
  position: relative;
  width: 68rem;
  margin-bottom: 1.6rem;

  a {
    width: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    text-decoration: none;
    color: ${palette.blueGrey[900]};
    height: 3rem;

    svg {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    &.active {
      color: ${palette.blueGrey[600]};
      font-weight: bold;
    }
  }
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

export default HomeTab
