import React from 'react'
import { Button, TextField } from '@mui/material'
import { inputStyle } from './RegisterForm'
import { css } from '@emotion/react'
import { useSignUpForm } from '../../hooks/useSignup'
import palette from '../../lib/palette'

export type RegisterFormDefaultProps = {}

function RegisterFormDefault({}: RegisterFormDefaultProps) {
  const {
    form, onChange, handleSubmit,
    loading, errorMessage
  } = useSignUpForm()

  return <>
    <h2 className='title'>Sign Up</h2>
    <section>
      <form>
        <TextField label='Email' variant='outlined' type='email' name='email'
                   value={form.email} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        <TextField label='Name' variant='outlined' type='text' name='username'
                   value={form.username} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        <TextField label='Password' variant='outlined' type='password' name='password'
                   value={form.password} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        <TextField label='Confirm Password' variant='outlined' type='password'
                   name='password_confirm'
                   value={form.password_confirm} onChange={onChange} css={inputStyle}
                   InputProps={{ style: { fontSize: 12 } }} />
        { errorMessage !== null && <div>ERROR</div>}
        <div css={privacyStyle}><p>By clicking Sign Up, you are indicating that you have read and acknowledge the
          <a> Terms of Service</a> and <a>Privacy Notice</a>.</p></div>
        <div className='button-div'>
          <Button variant='contained' disabled={loading} onClick={handleSubmit}>
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
    color: ${palette.deepOrange[600]};
  }

  a:hover {
    text-decoration: underline;
  }

`

export default RegisterFormDefault
