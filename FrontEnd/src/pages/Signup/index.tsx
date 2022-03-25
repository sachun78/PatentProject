import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Navigate, NavLink } from 'react-router-dom'
import React, { useCallback, useEffect } from 'react'
import { inputStyle, mailCheckStyle, privacyStyle, signupFormStyle, undoStyle } from './styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import { Button, TextField } from '@mui/material'
import useInputs from 'hooks/useInputs'
import Joi from 'joi'
import { errorMessageStyle } from 'pages/Login/styles'
import { useMutation, useQueryClient } from 'react-query'
import { signup } from '../../lib/api/auth/signup'
import { AxiosError } from 'axios'

type RegisterProps = {}

export default function Signup({}: RegisterProps) {
  const { data,isLoading } = useUserQuery()
  const queryClient = useQueryClient()
  const email = queryClient.getQueryData<string>('checkMail')

  const mutation = useMutation('signUp', () => (signup({ ...form, email: email || '' })), {
    onSuccess: () => {
      //? 성공시 로그인 페이지로 이동
    },
    onError(err: AxiosError) {
      console.log(err)
      setError(err.message)
    }
  })

  const [error, setError] = React.useState('')
  const [form, onChange] = useInputs({
    username: '',
    password: '',
    password_confirm: ''
  })
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.password_confirm) {
      setError('password does not match')
      return
    }

    const schema = Joi.object().keys({
      username: Joi.string().required().messages({
        'string.empty': 'name is required',
        'string.base': 'name is required'
      }),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required().messages({
          'string.pattern.base': 'password must be 8-20 characters',
          'string.empty': 'password is required',
          'string.base': 'password is required'
        }),
      password_confirm: Joi.ref('password')
    })
    schema.validateAsync(form)
      .then(res => {
        console.log(res)
        //mutate with register
        // await register({ ...form })
      })
      .catch(err => {
        setError(err.message)
      })
  }, [form])
  useEffect(() => {
    return () => {
      queryClient.setQueryData('checkMail', '')
    }
  }, [queryClient])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div css={wrapper}>
      <Auth width={622} height={500}>
        <div css={signupFormStyle}>
          <div css={undoStyle}>
            <NavLink to={'/login'} className='link'>
              <span>Back</span>
            </NavLink>
          </div>
          <h2 className='title'>Sign Up</h2>
          <section>
            <form onSubmit={onSubmit}>
              {/*TODO: email get from code check queryClient on MAILCHECK*/}
              {!email && <NavLink to={'/mail-check'} css={mailCheckStyle}> <span>Email Check</span> </NavLink>}
              {email && <><span css={errorMessageStyle}>{email}</span>
                <TextField label='Name' variant='outlined' type='text' name='username'
                           value={form.username} onChange={onChange} css={inputStyle}
                           InputProps={{ style: { fontSize: 12 } }} />
                <TextField label='Password' variant='outlined' type='password' name='password'
                           value={form.password} onChange={onChange} css={inputStyle}
                           autoComplete='password'
                           InputProps={{ style: { fontSize: 12 } }} />
                <TextField label='Confirm Password' variant='outlined' type='password'
                           name='password_confirm' autoComplete='password-confirm'
                           value={form.password_confirm} onChange={onChange} css={inputStyle}
                           InputProps={{ style: { fontSize: 12 } }} />
                <div css={privacyStyle}><p>By clicking Sign Up, you are indicating that you have read and acknowledge
                  the
                  <NavLink to={'/'}> Terms of Service</NavLink> and <NavLink to={'/'}>Privacy Notice</NavLink>.</p>
                </div>
                {error && <span css={errorMessageStyle}>{error}</span>}
                <div className='button-div'>
                  <Button variant='contained' disabled={false} type='submit' size='large'>Sign Up</Button>
                </div>
              </>}
            </form>
          </section>
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
