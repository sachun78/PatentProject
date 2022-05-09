import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Navigate, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import { privacyStyle } from './styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import { Button, CircularProgress, FormHelperText, InputAdornment, TextField } from '@mui/material'
import useInputs from 'hooks/useInputs'
import Joi from 'joi'
import { useMutation, useQuery } from 'react-query'
import { signup } from 'lib/api/auth/signup'
import { AxiosError } from 'axios'
import { MdLock } from 'react-icons/md'
import { checkCode } from 'lib/api/auth/sendmail'
import { toast } from 'react-toastify'
import { containerStyle, inputStyle } from '../Login/styles'

type RegisterProps = {}

export default function Signup({}: RegisterProps) {
  const { data: userData, isLoading } = useUserQuery()
  const [error, setError] = useState('')
  const [form, onChange] = useInputs({
    username: '',
    password: '',
    password_confirm: '',
  })

  const code = useSearchParams()[0].get('code')
  const navigate = useNavigate()
  const {
    data,
    error: codeError,
    isLoading: isLoadingCode,
  } = useQuery('authCode', () => checkCode(code ?? ''), {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

  const mutation = useMutation('signUp', () => signup({ ...form, email: data?.email || '' }), {
    onSuccess: () => {
      // Global Toast 표시, 로그인 페이지로 이동
      toast.success('register success', { position: 'top-center' })
      navigate('/login')
    },
    onError(err: AxiosError) {
      setError(err.response?.data.message)
    },
  })

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError('')
      if (form.password !== form.password_confirm) {
        setError('password does not match')
        return
      }

      const schema = Joi.object().keys({
        username: Joi.string().required().messages({
          'string.empty': 'name is required',
          'string.base': 'name is required',
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required().messages({
          'string.pattern.base': 'password must be 8-20 characters',
          'string.empty': 'password is required',
          'string.base': 'password is required',
        }),
        password_confirm: Joi.ref('password'),
      })
      schema
        .validateAsync(form)
        .then(() => {
          //mutate with register
          mutation.mutate()
        })
        .catch((err) => {
          setError(err.message)
        })
    },
    [form, mutation]
  )

  if (isLoading || isLoadingCode) {
    return (
      <div css={wrapper}>
        <CircularProgress />
      </div>
    )
  }

  if (userData) {
    return <Navigate replace to={'/'} />
  }

  if (codeError) {
    if (!toast.isActive('auth-signup')) {
      toast.error('Signup Error occurred, Please retry.', {
        position: 'top-center',
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        toastId: 'auth-signup',
      })
      return <Navigate replace to={'/login'} />
    }
  }

  if (!data) {
    toast.error('code is empty', { position: 'top-center' })
    return <Navigate replace to={'/login'} />
  }
  return (
    <Auth>
      <div css={containerStyle} style={{ padding: '3rem' }}>
        <h2 className="title">Sign Up</h2>
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
        >
          <section>
            <TextField
              label="Email"
              variant="outlined"
              type="text"
              name="email"
              value={data.email}
              css={inputStyle}
              style={{ width: '100%' }}
              disabled
              InputProps={{
                style: { fontSize: 12, backgroundColor: 'white' },
                endAdornment: (
                  <InputAdornment position="end">
                    <MdLock />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              name="username"
              value={form.username}
              onChange={onChange}
              css={inputStyle}
              autoComplete="off"
              style={{ width: '100%' }}
              InputProps={{ style: { fontSize: 12 } }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              css={inputStyle}
              autoComplete="password"
              style={{ width: '100%' }}
              InputProps={{ style: { fontSize: 12 } }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="password_confirm"
              autoComplete="password-confirm"
              value={form.password_confirm}
              onChange={onChange}
              css={inputStyle}
              style={{ width: '100%' }}
              InputProps={{ style: { fontSize: 12 } }}
            />
            {error && (
              <FormHelperText
                error
                id="helper-text-signup-error"
                variant={'outlined'}
                sx={{ fontSize: 14, textAlign: 'center' }}
              >
                {error}
              </FormHelperText>
            )}
          </section>
          <section>
            <div css={privacyStyle}>
              <p>
                By clicking Sign Up, you are indicating that you have read and
                <br />
                acknowledge the
                <NavLink to={'/policy/terms'}> Terms of Service</NavLink> and{' '}
                <NavLink to={'/policy/privacy'}>Privacy Notice</NavLink>.
              </p>
            </div>
            <div className="button-div">
              <Button variant="contained" disabled={mutation.isLoading} type="submit" fullWidth>
                Sign Up
              </Button>
            </div>
          </section>
        </form>
      </div>
    </Auth>
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
