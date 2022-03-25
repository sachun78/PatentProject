import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import React, { FormEvent, useCallback, useState } from 'react'
import { inputStyle, signupFormStyle, undoStyle } from 'pages/Signup/styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import { Button, TextField } from '@mui/material'
import useInputs from '../../hooks/useInputs'
import Joi from 'joi'
import { errorMessageStyle } from '../Login/styles'
import { useQueryClient } from 'react-query'

type RegisterProps = {}

export default function MailCheck({}: RegisterProps) {
  const qc = useQueryClient()
  const { data } = useUserQuery()
  const [codeMode, setCodeMode] = useState(false)
  const [mailTypeError, setMailTypeError] = useState('')
  const [form, onChange] = useInputs({
    email: '',
    code: ''
  })

  const { email, code } = form
  const onSendMail = useCallback(() => {
    setMailTypeError('')
    const schema = Joi.object().keys({
      email: Joi.string().email({ tlds: false }).required().messages({
        'string.email': 'Check your email type',
        'string.empty': 'Input your email',
        'any.required': 'Input your email'
      }),
      code: Joi.string().allow('')
    })

    schema.validateAsync(form)
      .then(res => {
        setCodeMode(true)
      })
      .catch(err => {
        setMailTypeError(err.message)
      })
  }, [form])
  const navigate = useNavigate()
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    console.log('test')
    qc.setQueryData('checkMail', 'ryanhe4@gmail.com')
    navigate('/signup')
  }, [navigate, qc])

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div css={wrapper}>
      <Auth width={622} height={500}>
        <div css={signupFormStyle}>
          <div css={undoStyle}>
            <NavLink to={'/signup'} className='link'>
              <span>Back</span>
            </NavLink>
          </div>
          <form onSubmit={onSubmit}>
            <h2 className='title'>Check Code</h2>
            {!codeMode && <>
              <TextField label='Email' variant='outlined' type='email' name='email' placeholder='Input your email'
                         autoComplete='off'
                         value={email} onChange={onChange} css={inputStyle}
                         InputProps={{ style: { fontSize: 12 } }} />
              {mailTypeError && <span css={errorMessageStyle}>{mailTypeError}</span>}
              <Button variant='contained' onClick={onSendMail} size='large'>send</Button>
            </>}
            {codeMode && <>
              <TextField label='CODE' variant='outlined' type='text' name='code'
                         placeholder='Check your email and input access code'
                         autoComplete='off'
                         value={code} onChange={onChange} css={inputStyle}
                         InputProps={{ style: { fontSize: 12 } }} />
              <Button variant='contained' type='submit' size='large'> verify </Button>
            </>}
          </form>
        </div>
      </Auth>
    </div>
  )
}

const wrapper = css`
  background-color: ${palette.blueGrey[50]};
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;

  align-items: center;
  justify-content: center;
`
