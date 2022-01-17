import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthFormBody from '.'
import useInputs from '../../hooks/useInputs'
import useSignup from '../../hooks/useSignup'
import { signupInput } from '../../lib/api/member/signup'
import palette from '../../lib/palette'
import IconControl from '../IconControl'
import RegisterFormDefault from './RegisterFormDefault'
import RegisterFormAdd from './RegisterFormAdd'

type RegisterFormProps = {}

export default function RegisterForm({}: RegisterFormProps) {
  const [form, onChange] = useInputs({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    company: '',
    department: '',
    position: '',
    tel: '',
    country: ''
  })

  const { sign, loading, error } = useSignup()
  const navigate = useNavigate()
  const [type, setType] = useState<'default' | 'additional'>('default')
  const [enable, setEnable] = useState(true)

  useEffect(() => {
    if (
      form.country === '' ||
      form.tel === '' ||
      form.position === '' ||
      form.department === '' ||
      form.company === ''
    ) {
      setEnable(true)
    } else {
      setEnable(false)
    }
  }, [form])

  const toggle = () => {
    const text = type === 'default' ? 'additional' : 'default'
    setType(text)
  }

  const next = () => {
    if (
      form.username === '' ||
      form.email === '' ||
      form.password === '' ||
      form.password_confirm === ''
    ) {
      alert('항목을 모두 입력해주세요')
      return
    }

    let reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (!reg.test(form.email)) {
      alert('올바르지 않은 이메일 형식입니다.')
      return
    }

    // reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    // if(!reg.test(form.password)) {
    //   alert('올바르지 않은 비밀번호 형식입니다.')
    //   return
    // }

    if (form.password_confirm !== form.password) {
      alert('패스워드가 일치하지 않습니다.')
      return
    }

    toggle()
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input: signupInput = {
      username: form.username,
      email: form.email,
      password: form.password,
      company: form.company,
      department: form.department,
      position: form.position,
      tel: form.tel,
      country: form.country
    }
    try {
      await sign(input)
      navigate('/login', { replace: true })
    } catch (e) {
    }
  }

  return (
    <AuthFormBody width={622} height={type === 'default' ? 500 : 560}>
      <div css={loginFormStyle}>
        <div css={undoStyle}>
          {type === 'default' ? (
            <NavLink to={'/login'} className='link'>
              <IconControl name={'undo'} /> <span>Back</span>
            </NavLink>
          ) : (
            <div className='link' onClick={toggle}>
              <IconControl name={'back'} />
            </div>
          )}
        </div>
        {type === 'default' ? (
          <RegisterFormDefault email={form.email} password={form.password} password_confirm={form.password_confirm}
                               username={form.username} onChange={onChange} next={next} />
        ) : (
          <RegisterFormAdd company={form.company} country={form.country} department={form.department} enable={enable}
                           position={form.position} tel={form.tel} onSubmit={onSubmit} onChange={onChange} loading={loading} />
        )}
      </div>
    </AuthFormBody>
  )
}

//TODO: signup page layout
const loginFormStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: white;
  padding: 1.5rem;
  padding-right: 2rem;
  line-height: 1.5rem;
  height: 100%;
  form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .title {
    margin: 0;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5;
  }

  section {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    flex: 1;
  }

  .link {
    display: inline-block;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: ${palette.blueGrey[500]};
    }

    color: ${palette.blueGrey[200]};
  }

  .button-div {
    flex-direction: column;
    display: flex;
    bottom: 0;
    justify-content: flex-end;
    margin-top: auto;
    button {
      flex: 1;
      height: 3.6rem;
    }
  }
`
export const inputStyle = css`
  width: 100%;
  margin-bottom: 1.5rem;

  label {
    font-size: 100%;
  }
`

const undoStyle = css`
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
  font-size: 1.5rem;
`
