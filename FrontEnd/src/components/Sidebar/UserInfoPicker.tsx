import { css } from '@emotion/react'
import palette from '../../lib/palette'
import React, { memo, useRef } from 'react'
import useAuth from '../../hooks/useAuth'
import { NavLink } from 'react-router-dom'
import useOnClickOutside from 'use-onclickoutside'
import { useQueryClient } from 'react-query'
import { User } from '../../lib/api/types'
import gravatar from 'gravatar'

export type UserInfoPickerProps = {
  visible: boolean;
  onClose: () => void;
}

function UserInfoPicker({ visible, onClose }: UserInfoPickerProps) {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')
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

  if (!user) {
    return null
  }

  return <>
    {visible ? <div css={wrapper} ref={ref}>
      <div css={blockStyle}>
        <ul>
          <li onClick={() => {
            onClose()
          }}>
            <NavLink to={'/profile'}>
              <img src={gravatar.url(user.email, { s: '20px', d: 'retro' })} alt={user.username} />
              {username}
            </NavLink>
          </li>
          <li onClick={() => logout()}>
            logout
          </li>
        </ul>
      </div>
    </div> : null}
  </>
}

const wrapper = css`
  position: absolute;
  right: 1rem;
  top: 100%;
  z-index: 5;`

const blockStyle = css`
  margin-right: 1rem;
  width: 16rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: ${palette.grey[50]};
  color: ${palette.purple[600]};
  transform-origin: right top;
  transform: scale(1);

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
  }

  li + li {
    border-top: 1px solid ${palette.grey[100]};
  }
`

export default memo(UserInfoPicker)
