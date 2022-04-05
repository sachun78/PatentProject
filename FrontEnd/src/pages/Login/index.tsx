import { Divider } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'
import React from 'react'
import { dividerStlye, loginFormStyle, underBlockStyle } from './styles'
import Auth from '../../layouts/Auth'
import useUserQuery from '../../hooks/query/useUserQuery'
import LoginForm from './login-form/LoginForm'

type LoginProps = {}

function Login({}: LoginProps) {
  const { data } = useUserQuery()

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <Auth width={800} height={600}>
      <div css={loginFormStyle}>
        <h2 className='title'>Sign In</h2>
        <section>
          <LoginForm />
        </section>
        <Divider css={dividerStlye}>OR</Divider>
        <section>
          <div css={underBlockStyle}>
            <div>
              <NavLink to={'/email/check'}>
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
  )
}


export default Login
