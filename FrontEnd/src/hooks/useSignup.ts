import { useState } from 'react'
import { signin, signinInput } from '../lib/api/member/signin'
import { signup, signupInput } from '../lib/api/member/signup'
import useInputs from './useInputs'
import Joi from 'joi'

export default function useSignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const register = async (input: signupInput) => {
    try {
      setLoading(true)
      await signup(input)
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
  const handleSubmit = async () => {
    const schema = Joi.object().keys({
      email: Joi.string().email({tlds: false}).required(),
      username: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required(),
      password_confirm: Joi.ref('password'),
    });
    try {
      //check validation using JOI
      // 1. email NOT EMPTY
      // 2. name NOT EMPTY
      // 3. password, password_confirm NOT EMPTY
      const result = await schema.validateAsync(form);
      console.log(result)
    } catch (e) {
      console.log(e)
      setErrorMessage(e as string)
      return
    }

    try {
      await register({ ...form })
      return
    } catch (e) {
      console.log(error)
      if (error) {
        setErrorMessage(error)
      } else {
        setErrorMessage('validation Error!')
      }
    }
  }

  return {
    form, onChange, handleSubmit,
    loading, errorMessage
  }
}

export function useSignin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = async (input: signinInput) => {
    try {
      setLoading(true)
      const result = await signin(input)
      console.log(result)
    } catch (e: any) {
      if (e.response.status === 409) {
        setError('Username already exists')
        throw e
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    loading,
    error
  }
}
