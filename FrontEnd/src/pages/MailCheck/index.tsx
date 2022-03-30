import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Navigate, NavLink } from 'react-router-dom'
import React, { FormEvent, useCallback, useState } from 'react'
import { inputStyle, signupFormStyle, undoStyle } from 'pages/Signup/styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import { Button, TextField } from '@mui/material'
import Joi from 'joi'
import { errorMessageStyle } from '../Login/styles'
import useInput from '../../hooks/useInput'
import { sendmail } from '../../lib/api/auth/sendmail'

type RegisterProps = {}

export default function MailCheck({}: RegisterProps) {
  const { data } = useUserQuery()
  const [mailTypeError, setMailTypeError] = useState('')
  const [email, onChangeEmail] = useInput('')
  const [sendMail, setSendMail] = useState(false)

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    setMailTypeError('')
    const schema = Joi.object().keys({
      email: Joi.string().email({ tlds: false }).required().messages({
        'string.email': 'Check your email type',
        'string.empty': 'Input your email',
        'any.required': 'Input your email'
      })
    })

    schema.validateAsync({ email })
      .catch(err => {
        setMailTypeError(err.message)
      })
    // TODO(hc): USE MUTATION
    sendmail(email)
      .then(() => {
        setSendMail(true)
      })
      .catch(err => {
        setMailTypeError(err.message)
      })
  }, [email])

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div css={wrapper}>
      <Auth width={622} height={240}>
        <div css={signupFormStyle}>
          <div css={undoStyle}>
            <NavLink to={'/login'} className='link'> <span>Back</span> </NavLink>
          </div>
          {sendMail
            ? <div>
              <h2 className='title'>Check Email</h2>
              <p>We sent a verification email to <span>{email}</span></p>
              <p>Please check your email and click the link to verify your email address.</p>
              <Button variant='contained' size='large'>OK</Button>
            </div>
            : <form onSubmit={onSubmit}>
              <h2 className='title'>Check Email</h2>
              <TextField label='Email' variant='outlined' type='email' name='email' placeholder='Input your email'
                         autoComplete='off'
                         value={email} onChange={onChangeEmail} css={inputStyle}
                         InputProps={{ style: { fontSize: 12 } }} />
              {mailTypeError && <span css={errorMessageStyle}>{mailTypeError}</span>}
              <Button variant='contained' type='submit' size='large'>send</Button>
            </form>}
        </div>
      </Auth>
    </div>
  )
}

const wrapper = css`
  background-color: ${palette.purple[50]};
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;

  align-items: center;
  justify-content: center;
`
