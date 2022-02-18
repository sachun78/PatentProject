import { css } from '@emotion/react'
import palette from '../../lib/palette'
import React from 'react'
import { useUserState } from '../../atoms/authState'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export type CategoryPickerProps = {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

function CategoryPicker({ visible, onClose }: CategoryPickerProps) {
  const [user] = useUserState()
  const username: string = user?.username || ''
  const { logout } = useAuth()

  return <>
    {visible ? <div css={wrapper}>
      <div css={blockStyle} onClick={onClose}>
        <ul>
          <li>
            <Link css={profileStyle} to={'/profile'}>{username}</Link>
          </li>
          <li onClick={logout}>
            <NavLink css={logoutStyle} to={'/login'}>logout</NavLink>
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
    padding: 1.2rem 1.6rem;

    &.active {
      color: ${palette.blueGrey[900]};
    }
  }

  li + li {
    border-top: 1px solid ${palette.grey[100]};
  }
`
const profileStyle = css`
  margin-left: 1rem;
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
