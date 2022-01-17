import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthFormBody from '.'
import { useLoginStateActions, useLoginValue } from '../../atoms/loginState'
import useInputs from '../../hooks/useInputs'
import { useSignin } from '../../hooks/useSignup'
import { signinInput } from '../../lib/api/member/signin'
import palette from '../../lib/palette'
import { TextField, Button, Divider } from '@mui/material'

type LoginFormProps = {}

export default function LoginForm({}: LoginFormProps) {
  const navigate = useNavigate()
  const loginActions = useLoginStateActions()
  const loginValue = useLoginValue()
  const { login, loading, error } = useSignin()
  const [form, onChange] = useInputs({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (loginValue.isloggedIn) {
      console.log('already loggedIn')
      navigate('/')
    }
  }, [loginValue])

  const handleTypeChange = () => {
    loginActions.toggle()
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input: signinInput = {
      email: form.email,
      password: form.password
    }
    try {
      await login(input)
      loginActions.setLoggedIn(true)
      alert('로그인 성공')
      navigate('/')
    } catch (e) {
    }
  }

  return (
    <AuthFormBody width={622} height={480}>
      <div css={loginFormStyle}>
        {loginValue.loginType === 'USER' ? (
          <>
            <h2 className='title'>Log In</h2>
            <section>
              <form onSubmit={onSubmit}>
                <div>
                  <TextField id='outlined-basic' label='username' variant='outlined' type='email' name='email'
                             value={form.email} onChange={onChange} css={inputStyle}
                             InputProps={{ style: { fontSize: 15 } }} />
                </div>
                <div><TextField id='outlined-basic' label='password' variant='outlined' type='password' name='password'
                                value={form.password} onChange={onChange} css={inputStyle}
                                InputProps={{ style: { fontSize: 15 } }} />
                </div>
                <div className='button-div'>
                  <Button variant='contained' type='submit' color='primary'>
                    Log In
                  </Button>
                </div>
              </form>
            </section>
            <Divider css={dividerStlye}>OR</Divider>
            <section>
              <div css={underBlockStyle}>
                <div>
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
        ) : (
          <>
            <h2 className='title'>비회원 로그인 </h2>
            <section>
              <form onSubmit={onSubmit}>
                <div><TextField id='outlined-basic' label='username' variant='outlined' type='email' css={inputStyle} />
                </div>
                <div><TextField id='outlined-basic' label='password' variant='outlined' type='password'
                                css={inputStyle} />
                </div>
                <div className='button-div'>
                  <Button type='submit'>
                    시작하기
                  </Button>
                </div>
              </form>
            </section>
          </>
        )}
        <div className='foot'>
          <span>{loginValue.loginType === 'USER' ? '비회원으로' : '회원으로'}</span>
          <div className='link' onClick={handleTypeChange}>
            {loginValue.loginType === 'USER' ? '사용' : '로그인'}
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
