import React from 'react'
import { Button, TextField } from '@mui/material'
import { inputStyle } from './RegisterForm'
import { css } from '@emotion/react'

export type RegisterFormEmailAuthProps = {}

function RegisterEmailAuth({}: RegisterFormEmailAuthProps) {
  return <div css={wrapper}>
    <h2 className='title'>Verify Code</h2>
    <h4>please check your email</h4>
    <form>
      <TextField label='CODE' variant='outlined' type='text' name='verify-code'
        // value={form.email} onChange={onChange}
                 css={inputStyle}
                 InputProps={{ style: { fontSize: 12 } }} />
      <Button variant={'contained'}>OK</Button>
    </form>
  </div>
}

const wrapper = css`
  height: 0;

  form {
    display: flex;
    flex-direction: column;
  }

  h4 {
    height: 4rem;
  }

  .css-1xi3vbk-MuiFormControl-root-MuiTextField-root-inputStyle {
    flex: 1;
  }

  button {
    flex: 0;
  }
`

export default RegisterEmailAuth
