import { Divider } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'
import React from 'react'
import { containerStyle, dividerStyle, loginFormStyle, underBlockStyle } from './styles'
import useUserQuery from 'hooks/query/useUserQuery'
import LoginForm from './login-form/LoginForm'
import Auth from 'layouts/Auth'

type LoginProps = {}

function Login({}: LoginProps) {
  const { data } = useUserQuery()

  if (data) {
    return <Navigate replace to={'/'} />
  }

  return (
    <Auth>
      <div css={containerStyle}>
        <figure>
          <img src={'/assets/login_logo.png'} alt={'login-logo'} />
        </figure>
        <div css={loginFormStyle}>
          <section>
            <LoginForm />
          </section>
          <Divider css={dividerStyle}>OR</Divider>
          <section>
            <div css={underBlockStyle}>
              <NavLink to={'/email/check'} style={{ marginLeft: '3.0625rem' }}>
                <h4>Sign Up</h4>
              </NavLink>
              <NavLink to={'/email/forgot'} style={{ marginRight: '1rem' }}>
                <h4>Forgot Password</h4>
              </NavLink>
            </div>
          </section>
        </div>
      </div>
    </Auth>
  )
}

export default Login
