import { css } from '@emotion/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthFormBody from '.'
import useInputs from '../../hooks/useInputs'
import { signinInput } from '../../lib/api/auth/signin'
import palette from '../../lib/palette'
import { Button, Divider, TextField } from '@mui/material'
import { useSignin } from '../../hooks/useSignIn'
import { useRegisterFormState } from '../../atoms/authState'

type LoginFormProps = {}

export default function LoginForm({}: LoginFormProps) {
  const { login, loading, error } = useSignin()
  const [, setRegisterForm] = useRegisterFormState()
  const [form, onChange] = useInputs({
    email: '',
    password: ''
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input: signinInput = {
      name: '',
      email: form.email,
      password: form.password
    }
    try {
      await login(input)
    } catch (e) {
    }
  }

  return (
    <AuthFormBody width={622} height={480}>
      <div css={loginFormStyle}>
        <>
          <h2 className='title'>Log In</h2>
          <section>
            <form onSubmit={onSubmit}>
              <div>
                <TextField label='username' variant='outlined' type='email' name='email'
                           value={form.email} onChange={onChange} css={inputStyle} autoComplete='username'
                           InputProps={{ style: { fontSize: 15 } }} />
              </div>
              <div><TextField label='password' variant='outlined' type='password' name='password'
                              value={form.password} onChange={onChange} css={inputStyle}
                              autoComplete='current-password'
                              InputProps={{ style: { fontSize: 15 } }} />
              </div>
              <div className='button-div'>
                <Button variant='contained' type='submit' color='primary' disabled={loading} size='large'>
                  Log In
                </Button>
              </div>
            </form>
          </section>
          <Divider css={dividerStlye}>OR</Divider>
          <section>
            <div css={underBlockStyle}>
              <div onClick={() => setRegisterForm('default')}>
                <NavLink to={'/register'}>
                  <h4>Sign Up</h4>
                </NavLink>
              </div>
              <div>
                <h4>Forget Password</h4>
              </div>
            </div>
          </section>
        </>
        <div className='foot'>
          <span>비회원으로</span>
          <div className='link'>
            사용
          </div>
        </div>
      </div>
    </AuthFormBody>
  )
}

const loginFormStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  margin-top: 2.25rem;
  line-height: 1.5;

  .title {
    margin: 0;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
  }

  section {
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    flex: 1;
  }

  section + section {
    margin-top: 0;
  }

  a {
    text-decoration: none;
  }

  .foot {
    text-align: right;
    line-height: 1.5rem;
    font-size: 1.125rem;

    span {
      margin-right: 0.25rem;
    }

    .link {
      display: inline-block;
      font-weight: bold;
      color: ${palette.blue[500]};
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .button-div {
    display: flex;
    height: 3.6rem;

    button {
      flex: 1;
    }
  }
`
const inputStyle = css`
  width: 100%;
  margin-bottom: 1.5rem;

  label {
    font-size: 100%;
  }
`
const dividerStlye = css`
  height: 1rem;
  color: ${palette.grey[400]};
  margin-bottom: 1rem;

  &:before, &:after {
    border-color: ${palette.grey[400]};
  }
`
const underBlockStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;

  div {
    flex: 1;

    h4 {
      text-align: center;
      color: ${palette.blueGrey['600']};
      font-size: 1.3rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
