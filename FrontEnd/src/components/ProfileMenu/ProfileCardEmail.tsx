import { emailStyle, itemStyle } from './styles'
import React from 'react'

export type ProfileCardEmailProps = {
  title: string
  email: string
}

function ProfileCardEmail({ title, email }: ProfileCardEmailProps) {
  return <div css={itemStyle}>
    <div className='inner'>
      <div className='title'>
        <label>{title}</label>
      </div>
      <div css={emailStyle}>
        <div className='email-block'>{email}</div>
        <p>
          <strong>Verified.</strong> Thank you for verifying your email.
        </p>
      </div>
    </div>
  </div>
}

export default ProfileCardEmail
