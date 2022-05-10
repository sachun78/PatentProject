import { Divider, FormHelperText, OutlinedInput } from '@mui/material'
import React, { FormEvent, useCallback, useState } from 'react'
import useInput from 'hooks/useInput'
import Joi from 'joi'
import { sendmail } from 'lib/api/auth/sendmail'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { inputStyle } from '../../Login/styles'
import LoadingButton from '@mui/lab/LoadingButton'

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
          <br />
          <p>Please check your email link and click to verify</p>
          <br />
          <Divider sx={{ marginBottom: '0.5rem' }}>OR</Divider>
          <LoadingButton
            variant="contained"
            fullWidth
            onClick={onSubmit}
            loading={sendmailMut.isLoading}
            loadingPosition={'start'}
          >
            resend
          </LoadingButton>
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
            <FormHelperText error id="helper-text-email-check">
              * {mailTypeError}
            </FormHelperText>
          ) : (
            <FormHelperText>You'll need to verify that you own this email account.</FormHelperText>
          )}
          <div className="button-div">
            <LoadingButton
              variant="contained"
              type="submit"
              fullWidth
              loading={sendmailMut.isLoading}
              loadingPosition={'start'}
            >
              mail check
            </LoadingButton>
          </div>
        </form>
      )}
    </>
  )
}

export default MailCheckForm
