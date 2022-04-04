import { Button, FormHelperText, InputLabel, OutlinedInput, Stack } from '@mui/material'
import React, { FormEvent, useCallback, useState } from 'react'
import useInput from 'hooks/useInput'
import Joi from 'joi'
import { sendmail } from 'lib/api/auth/sendmail'

export type MailCheckFormProps = {
  onSendmail: () => void
}

function MailCheckForm({ onSendmail }: MailCheckFormProps) {
  const [mailTypeError, setMailTypeError] = useState('')
  const [email, onChangeEmail, setEmail] = useInput('')
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
        onSendmail()
      })
      .catch(err => {
        setMailTypeError(err.response.data.message)
      })
    setEmail('')
  }, [email, setEmail])

  return <form onSubmit={onSubmit}>
    <Stack spacing={2}>
      <InputLabel htmlFor='mailcheck-signup'>Check Email</InputLabel>
      <div>
        <OutlinedInput value={email} onChange={onChangeEmail} placeholder='email'
                       type='email' name='email' id='email-check'
                       inputProps={{}}
                       error={Boolean(mailTypeError)}
                       fullWidth
        />
        {mailTypeError &&
          <FormHelperText error id='helper-text-email-check'>
            {mailTypeError}
          </FormHelperText>}
      </div>
      <Button variant='contained' type='submit' size='large'>send</Button>
    </Stack>
  </form>
}

export default MailCheckForm
