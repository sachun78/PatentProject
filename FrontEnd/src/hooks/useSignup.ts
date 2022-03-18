import { useState } from 'react'
import { signup, signupInput } from '../lib/api/auth/signup'
import useInputs from './useInputs'
import Joi from 'joi'
import useAuth from './useAuth'
import { useRegisterFormState } from '../atoms/authState'
import { sendmail } from '../lib/api/auth/sendmail'

export default function useSignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { authorize } = useAuth()
  const register = async (input: signupInput) => {
    try {
      setLoading(true)
      const result = await signup(input)
      authorize(result.user)
      await sendmail(result.user.email)
    } catch (e: any) {
      if (e.response.status === 409) {
        setError('email already exists')
        throw e
      }
    } finally {
      setLoading(false)
    }
  }
  return {
    register,
    loading,
    error
  }
}

export function useSignUpForm() {
  const [form, onChange] = useInputs({
    username: '',
    email: '',
    password: '',
    password_confirm: ''
  })
  const { register, loading, error } = useSignUp()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [, setType] = useRegisterFormState()
  const handleSubmit = async () => {
    const schema = Joi.object().keys({
      email: Joi.string().email({ tlds: false }).required(),
      username: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required(),
      password_confirm: Joi.ref('password')
    })
    try {
      const result = await schema.validate(form)
      console.log(result)

      if (form.password !== form.password_confirm) {
        setErrorMessage('password does not match')
        return
      }

      await register({ ...form })
      setType('email-auth')
    } catch (e) {
      console.log(e)
      setErrorMessage(e as string)
      return
    }
  }

  return {
    form, onChange, handleSubmit,
    loading, errorMessage
  }
}
