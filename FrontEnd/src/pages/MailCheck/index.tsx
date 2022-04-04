import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Navigate, NavLink } from 'react-router-dom'
import React, { FormEvent, useCallback, useState } from 'react'
import { signupFormStyle, undoStyle } from 'pages/Signup/styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import { Button, FormHelperText, InputLabel, OutlinedInput, Stack } from '@mui/material'
import Joi from 'joi'
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
        setMailTypeError(err.response.data.message)
      })
  }, [email])

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div css={wrapper}>
      <Auth width={800} height={360}>
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
              <Stack spacing={1}>
                <InputLabel htmlFor='mailcheck-signup'>Check Email</InputLabel>
                <OutlinedInput value={email} onChange={onChangeEmail} placeholder='email'
                               type='email' name='email' id='email-check'
                               inputProps={{}}
                               error={Boolean(mailTypeError)}
                               fullWidth
                />
                {mailTypeError && (
                  <FormHelperText error id='helper-text-email-check'>
                    {mailTypeError}
                  </FormHelperText>
                )}
                <Button variant='contained' type='submit' size='large'>send</Button>
              </Stack>
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
