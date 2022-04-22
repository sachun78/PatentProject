import { Link, Navigate } from 'react-router-dom'
import React from 'react'
import { undoStyle } from 'pages/Signup/styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import MailCheckForm from './mailcheck-form/MailCheckForm'
import { containerStyle } from '../Login/styles'

type RegisterProps = {}

export default function MailCheck({}: RegisterProps) {
  const { data } = useUserQuery()

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <Auth>
      <div
        css={containerStyle}
        style={{ padding: '2rem', height: 'auto', width: 'auto' }}
      >
        <div css={undoStyle}>
          <Link to={'/login'} className="link">
            <span>Back</span>
          </Link>
        </div>
        <MailCheckForm />
      </div>
    </Auth>
  )
}
