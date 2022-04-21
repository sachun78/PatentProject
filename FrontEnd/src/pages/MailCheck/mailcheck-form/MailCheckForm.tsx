import {
  Button,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material'
import React, { FormEvent, useCallback, useState } from 'react'
import useInput from 'hooks/useInput'
import Joi from 'joi'
import { sendmail } from 'lib/api/auth/sendmail'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

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
          'string.empty': 'Input your email',
          'any.required': 'Input your email',
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
          <p>
            Please check your email and click the link to verify your email
            address.
          </p>
          <Button variant="contained" size="large">
            resend
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <InputLabel htmlFor="mailcheck-signup">Check Email</InputLabel>
            <div>
              <OutlinedInput
                value={email}
                onChange={onChangeEmail}
                placeholder="email"
                type="email"
                name="email"
                id="email-check"
                inputProps={{}}
                error={Boolean(mailTypeError)}
                fullWidth
              />
              {mailTypeError && (
                <FormHelperText error id="helper-text-email-check">
                  {mailTypeError}
                </FormHelperText>
              )}
            </div>
            <Button variant="contained" type="submit" size="large">
              send
            </Button>
          </Stack>
        </form>
      )}
    </>
  )
}

export default MailCheckForm
