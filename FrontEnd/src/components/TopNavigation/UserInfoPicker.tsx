import { css } from '@emotion/react'
import palette from '../../lib/palette'
import React, { useRef } from 'react'
import { useUserState } from '../../atoms/authState'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import useOnClickOutside from 'use-onclickoutside'

export type CategoryPickerProps = {
  visible: boolean;
  onClose: () => void;
}

function CategoryPicker({ visible, onClose }: CategoryPickerProps) {
  const [user] = useUserState()
  const username: string = user?.username || ''
  const { logout } = useAuth()

  const ref = useRef<HTMLDivElement>(null)

  const onOutsideClick: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    onClose()
  }
  useOnClickOutside(ref, onOutsideClick)

  return <>
    {visible ? <div css={wrapper} ref={ref}>
      <div css={blockStyle}>
        <ul>
          <li onClick={onClose}>
            <Link css={profileStyle} to={'/profile'}>{username}</Link>
          </li>
          <li onClick={logout}>
            <Link css={logoutStyle} to={'/login'}>logout</Link>
          </li>
        </ul>
      </div>
    </div> : null}
  </>
}

const wrapper = css`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 5;`

const blockStyle = css`

  margin-right: 1rem;
  width: 10.2rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: ${palette.grey[50]};
  color: ${palette.blueGrey[600]};
  transform-origin: top right;

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  li {
    text-align: center;
    cursor: pointer;

    &:hover {
      background: ${palette.grey[100]};
    }

    font-weight: 600;
    font-size: 1.4rem;
    padding: 1.2rem 0.8rem;

    &.active {
      color: ${palette.blueGrey[900]};
    }
  }

  li + li {
    border-top: 1px solid ${palette.grey[100]};
  }
`
const profileStyle = css`
  font-size: 1.25rem;
  text-decoration: none;
  font-weight: 600;

`
const logoutStyle = css`
  margin-left: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  font-weight: 600;
`

export default CategoryPicker
