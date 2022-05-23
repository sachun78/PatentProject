import { Link, Navigate } from 'react-router-dom'
import React, { useState } from 'react'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import MailCheckForm from './mailcheck-form/MailCheckForm'
import { containerStyle, loginFormStyle } from '../Login/styles'
import { undoStyle } from '../Signup/styles'

type RegisterProps = {
  type?: 'register' | 'forgot'
}

export default function MailCheck({ type = 'register' }: RegisterProps) {
  const { data } = useUserQuery()
  const [sendMail, setSendMail] = useState(false)
  const onSendmail = () => {
    setSendMail(true)
  }
  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <Auth>
      <div css={containerStyle} style={!sendMail ? { height: '31.75rem' } : { height: '34.3125rem' }}>
        <figure>
          <img src={'/assets/login_logo.png'} alt={'login-logo'} />
        </figure>
        <div css={loginFormStyle}>
          <section>
            <MailCheckForm sendMail={sendMail} onSendmail={onSendmail} type={type} />
          </section>
        </div>
        <Link to={'/login'} className="link" css={undoStyle}>
          <span>Back</span>
        </Link>
      </div>
    </Auth>
  )
}
