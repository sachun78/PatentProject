import { Button, FormHelperText, TextField } from '@mui/material'
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
  }, [mutation])

  return <form onSubmit={onSubmit}>
    <div>
      <TextField label='Email' variant='outlined' type='email' name='email'
                 value={form.email} onChange={onChange} css={inputStyle}
                 InputProps={{ style: { fontSize: 15 } }} />
    </div>
    <div><TextField label='Password' variant='outlined' type='password' name='password'
                    value={form.password} onChange={onChange} css={inputStyle}
                    autoComplete='password' InputProps={{ style: { fontSize: 15 } }} />
    </div>
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
