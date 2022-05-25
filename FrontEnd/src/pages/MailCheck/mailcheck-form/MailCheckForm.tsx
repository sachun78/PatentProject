import { Divider, FormHelperText, OutlinedInput } from '@mui/material'
import React, { FormEvent, useCallback, useState } from 'react'
import useInput from 'hooks/useInput'
import Joi from 'joi'
import { forgot_passwd, sendmail } from 'lib/api/auth/sendmail'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { helpertextStyle, inputStyle } from 'pages/Login/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import styled from '@emotion/styled'

export type MailCheckFormProps = {
  sendMail: boolean
  onSendmail: () => void
  type: 'register' | 'forgot'
}

function MailCheckForm({ sendMail, onSendmail, type }: MailCheckFormProps) {
  const [mailTypeError, setMailTypeError] = useState('')
  const [email, onChangeEmail, setEmail] = useInput('')
  const sendmailMut = useMutation(type === 'register' ? sendmail : forgot_passwd, {
    onSuccess: () => {
      onSendmail()
    },
    onError: (err: AxiosError) => {
      setMailTypeError(err.response?.data.message)
      setEmail('')
    },
  })

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setMailTypeError('')
      const schema = Joi.object().keys({
        email: Joi.string().email({ tlds: false }).required().messages({
          'string.email': 'Check your email type',
          'string.empty': 'Input your email address',
          'any.required': 'Input your email address',
        }),
      })

      schema.validateAsync({ email }).catch((err) => {
        setMailTypeError(err.message)
      })
      sendmailMut.mutate(email)
    },
    [email, sendmailMut]
  )

  return (
    <>
      {sendMail ? (
        <CheckEmailBlock>
          <h2>Check Email</h2>
          <p>We sent a verification email</p>
          <p>Please check your email link and click to verify</p>
          <Divider
            sx={{
              marginBottom: '1.5625rem',
              marginTop: '1.5625rem',
              color: '#9c9c9c',
              font: 'normal normal bold 11px/12px NanumBarunGothicOTF',
            }}
          >
            OR
          </Divider>
          {type === 'register' && (
            <div className="button-div">
              <LoadingButton
                variant="contained"
                fullWidth
                onClick={onSubmit}
                loading={sendmailMut.isLoading}
                loadingPosition={'start'}
              >
                Resend
              </LoadingButton>
            </div>
          )}
        </CheckEmailBlock>
      ) : (
        <form onSubmit={onSubmit}>
          <OutlinedInput
            value={email}
            onChange={onChangeEmail}
            placeholder="email"
            type="email"
            name="email-check"
            id="email-check"
            css={inputStyle}
            error={Boolean(mailTypeError)}
            style={{ borderRadius: '12px', height: '45px' }}
          />
          {mailTypeError ? (
            <FormHelperText error id="helper-text-email-check" css={helpertextStyle}>
              {mailTypeError}
            </FormHelperText>
          ) : (
            <FormHelperText css={helpertextStyle}>
              You'll need to verify that you own this email account.
            </FormHelperText>
          )}
          <div className="button-div">
            <LoadingButton variant="contained" type="submit" fullWidth loading={sendmailMut.isLoading}>
              Email Check
            </LoadingButton>
          </div>
        </form>
      )}
    </>
  )
}

export default MailCheckForm

const CheckEmailBlock = styled.div`
  color: #6c6c6c;
  text-align: center;

  h2 {
    font: normal normal bold 16px/18px NanumSquareOTF;
    margin-bottom: 15px;
  }

  p {
    font: normal normal normal 16px/24px NanumSquareOTF;
    color: #6c6c6c;
  }
`
