import Auth from '../../layouts/Auth'
import { containerStyle, inputStyle, loginFormStyle } from '../Login/styles'
import React, { useCallback, useState } from 'react'
import { Button, CircularProgress, FormHelperText, TextField } from '@mui/material'
import useInputs from '../../hooks/useInputs'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { checkCode } from '../../lib/api/auth/sendmail'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { resetPassword } from '../../lib/api/auth/resetPassword'

export type ForgotProps = {}

function Forgot({}: ForgotProps) {
  const [error, setError] = useState('')
  const [form, onChange] = useInputs({
    password: '',
    password_confirm: '',
  })
  const code = useSearchParams()[0].get('code')
  const {
    data,
    error: codeError,
    isLoading: isLoadingCode,
  } = useQuery('resetCode', () => checkCode(code ?? ''), {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

  const navigate = useNavigate()
  const reset = useMutation('reset', resetPassword, {
    onSuccess: () => {
      navigate('/login')
    },
    onError(err: AxiosError) {
      setError(err.response?.data.message)
    },
  })

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      reset.mutate({ password: form.password, email: '' })
    },
    [form.password, reset]
  )

  if (isLoadingCode) {
    return <CircularProgress />
  }

  if (codeError) {
    if (!toast.isActive('reset-password')) {
      toast.error('CodeCheck Error occurred, Please retry.', {
        position: 'top-center',
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        toastId: 'reset-password',
      })
      return <Navigate replace to={'/login'} />
    }
  }

  return (
    <Auth>
      <div css={containerStyle} style={{ height: '34.3125rem' }}>
        <figure>
          <img src={'/assets/login_logo.png'} alt={'login-logo'} />
        </figure>
        <div css={loginFormStyle}>
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
          >
            <section>
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                css={inputStyle}
                autoComplete="password"
                style={{ height: '45px' }}
              />
              <TextField
                label="Confirm New Password"
                variant="outlined"
                type="password"
                name="password_confirm"
                autoComplete="password-confirm"
                value={form.password_confirm}
                onChange={onChange}
                css={inputStyle}
                style={{ height: '45px' }}
              />
              {error && (
                <FormHelperText
                  error
                  id="helper-text-reset-error"
                  variant={'outlined'}
                  sx={{ fontSize: 14, textAlign: 'center' }}
                >
                  {error}
                </FormHelperText>
              )}
            </section>
            <section>
              <div className="button-div">
                <Button variant="contained" type="submit" fullWidth>
                  Change Password
                </Button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Auth>
  )
}

export default Forgot
