import { Button, FormHelperText, OutlinedInput } from '@mui/material'
import { inputStyle } from '../styles'
import React, { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { signin } from 'lib/api/auth/signin'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import useInputs from 'hooks/useInputs'

export type LoginFormProps = {}

function LoginForm({}: LoginFormProps) {
  const queryClient = useQueryClient()
  const [loginError, setLoginError] = useState('')

  const mutation = useMutation(() => {
    return signin({ ...form })
  }, {
    onSuccess: (res) => {
      console.log(res.user)
      toast('Login Success', { type: 'success', position: 'top-center', autoClose: 2000, hideProgressBar: true })
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
    if (!form.email || !form.email.trim() || !form.password.trim() || !form.password) {
      setLoginError('email or password is empty')
      return
    }
    mutation.mutate()
  }, [form.email, form.password, mutation])

  return <form onSubmit={onSubmit}>
    <OutlinedInput type='email' name='email' placeholder={'username'} value={form.email} onChange={onChange}
                   css={inputStyle} fullWidth
                   sx={{ borderRadius: '12px', height: '45px' }}
    />
    <OutlinedInput type='password' name='password' placeholder={'password'} value={form.password} onChange={onChange}
                   css={inputStyle} autoComplete='password' fullWidth
                   sx={{ borderRadius: '12px', height: '45px' }} />
    {loginError && <FormHelperText error id='helper-text-login'>{loginError}</FormHelperText>}
    <div className='button-div'>
      <Button variant='contained' type='submit' color='primary' disabled={mutation.isLoading}
              size='large'>
        Log In
      </Button>
    </div>
  </form>
}

export default LoginForm
