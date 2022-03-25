import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Button, Divider, TextField } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import useInputs from 'hooks/useInputs'
import { signin } from 'lib/api/auth/signin'
import { dividerStlye, errorMessageStyle, inputStyle, loginFormStyle, underBlockStyle } from './styles'
import Auth from '../../layouts/Auth'
import useUserQuery from '../../hooks/query/useUserQuery'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

type LoginProps = {}

function Login({}: LoginProps) {
  const queryClient = useQueryClient()
  const { data } = useUserQuery()
  const [loginError, setLoginError] = useState('')
  const mutation = useMutation(() => {
    return signin({ ...form })
  }, {
    onSuccess: (res) => {
      console.log(res.user)
      queryClient.setQueryData('user', res.user)
    },
    onError: (err: AxiosError) => {
      setLoginError(err.response?.data?.message)
    }
  })
  const [form, onChange] = useInputs({
    email: '',
    password: ''
  })

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    mutation.mutate()
  }, [mutation])

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div css={pageStyle}>
      <Auth width={622} height={480}>
        <div css={loginFormStyle}>
          <h2 className='title'>Sign In</h2>
          <section>
            <form onSubmit={onSubmit}>
              <div>
                <TextField label='Email' variant='outlined' type='email' name='email'
                           value={form.email} onChange={onChange} css={inputStyle} required
                           InputProps={{ style: { fontSize: 15 } }} />
              </div>
              <div><TextField label='Password' variant='outlined' type='password' name='password'
                              value={form.password} onChange={onChange} css={inputStyle} required
                              InputProps={{ style: { fontSize: 15 } }} />
              </div>
              {loginError && <span css={errorMessageStyle}> {loginError}</span>}
              <div className='button-div'>
                <Button variant='contained' type='submit' color='primary' disabled={mutation.isLoading}
                        size='large'>
                  Log In
                </Button>
              </div>
            </form>
          </section>
          <Divider css={dividerStlye}>OR</Divider>
          <section>
            <div css={underBlockStyle}>
              <div>
                <NavLink to={'/signup'}>
                  <h4>Sign Up</h4>
                </NavLink>
              </div>
              <div>
                <h4>Forget Password</h4>
              </div>
            </div>
          </section>
        </div>
      </Auth>
    </div>
  )
}

const pageStyle = css`
  background-color: ${palette.blueGrey[50]};
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`


export default Login
