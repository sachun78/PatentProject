import { Link, Navigate } from 'react-router-dom'
import React from 'react'
import { undoStyle } from 'pages/Signup/styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import MailCheckForm from './mailcheck-form/MailCheckForm'
import { containerStyle, loginFormStyle } from '../Login/styles'

type RegisterProps = {}

export default function MailCheck({}: RegisterProps) {
  const { data } = useUserQuery()

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <Auth>
      <div css={containerStyle} style={{ height: '28rem' }}>
        <Link to={'/login'} className="link" css={undoStyle}>
          <span>Back</span>
        </Link>
        <figure>
          <img src={'/assets/login_logo.png'} alt={'login-logo'} />
        </figure>
        <div css={loginFormStyle}>
          <section>
            <MailCheckForm />
          </section>
        </div>
      </div>
    </Auth>
  )
}
