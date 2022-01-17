import React from 'react'
import { Button, TextField } from '@mui/material'
import { inputStyle } from './RegisterForm'
import { css } from '@emotion/react'

export type RegisterFormDefaultProps = {
  email: string,
  username: string,
  password: string,
  password_confirm: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  next: () => void
}

function RegisterFormDefault({
                               email,
                               username,
                               password,
                               password_confirm,
                               next,
                               onChange
                             }: RegisterFormDefaultProps) {
  return <>
    <h2 className='title'>Sign Up</h2>
    <section>
      <form>
        <TextField id='outlined-basic' label='Email' variant='outlined' type='email' name='email'
                   value={email} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        <TextField id='outlined-basic' label='Name' variant='outlined' type='text' name='username'
                   value={username} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        <TextField id='outlined-basic' label='Password' variant='outlined' type='password' name='password'
                   value={password} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        <TextField id='outlined-basic' label='Confirm Password' variant='outlined' type='password'
                   name='password_confirm'
                   value={password_confirm} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        <div css={privacyStyle}><p>By clicking Sign Up, you are indicating that you have read and acknowledge the <a>Terms
          of Service</a> and <a>Privacy Notice</a>.</p></div>
        <div className='button-div'>
          <Button variant='contained' onClick={next}>
            Sign Up
          </Button>
        </div>
      </form>
    </section>
  </>
}

const privacyStyle = css`
  margin: 0;
  margin-bottom: 2rem;
  text-align: center;
  padding: 0;
  vertical-align: baseline;

  p {
    color: #53535f;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

`

export default RegisterFormDefault
