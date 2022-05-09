import { Button, FormHelperText, OutlinedInput } from '@mui/material'
import React, { FormEvent, useCallback, useState } from 'react'
import useInput from 'hooks/useInput'
import Joi from 'joi'
import { sendmail } from 'lib/api/auth/sendmail'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { inputStyle } from '../../Login/styles'

export type MailCheckFormProps = {}

function MailCheckForm({}: MailCheckFormProps) {
  const [mailTypeError, setMailTypeError] = useState('')
  const [sendMail, setSendMail] = useState(false)
  const [email, onChangeEmail, setEmail] = useInput('')
  const sendmailMut = useMutation(sendmail, {
    onSuccess: () => {
      setSendMail(true)
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
        <div>
          <h2 className="title">Check Email</h2>
          <p>We sent a verification email</p>
          <p>Please check your email and click the link to verify your email address.</p>
          <Button variant="contained" size="large">
            resend
          </Button>
        </div>
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
            sx={{ borderRadius: '12px', height: '45px' }}
          />
          {mailTypeError ? (
            <FormHelperText
              error
              id="helper-text-email-check"
              // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              * {mailTypeError}
            </FormHelperText>
          ) : (
            <FormHelperText>You'll need to verify that you own this email account.</FormHelperText>
          )}
          <div className="button-div">
            <Button variant="contained" type="submit" size="large">
              mail check
            </Button>
          </div>
        </form>
      )}
    </>
  )
}

export default MailCheckForm
