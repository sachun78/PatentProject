import { css } from '@emotion/react'
import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthFormBody from '.'
import useInputs from '../../hooks/useInputs'
import useSignup from '../../hooks/useSignup'
import { signupInput } from '../../lib/api/member/signup'
import palette from '../../lib/palette'
import IconControl from '../IconControl'

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
    country: '',
  })

  const {sign, loading, error} = useSignup();
  const navigate = useNavigate()
  const [type, setType] = useState<'default' | 'additional'>('default')
  const [enable,setEnable] = useState(true)

  useEffect(()=> {
    if (
      form.country === '' ||
      form.tel === '' ||
      form.position === '' ||
      form.department === '' ||
      form.company === ''
    ) {
      setEnable(true)
    }
    else {
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

    let reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!reg.test(form.email)) {
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
    const input:signupInput = {
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
    <AuthFormBody width={606} height={type === 'default' ? 480 : 560}>
      <div css={loginFormStyle}>
        <div css={undoStyle}>
          {type === 'default' ? (
            <NavLink to={'/login'} className="link">
              <IconControl name={'back'} />
            </NavLink>
          ) : (
            <div className="link" onClick={toggle}>
              <IconControl name={'back'} />
            </div>
          )}
        </div>
        {type === 'default' ? (
          <>
            <h2>회원가입</h2>
            <section>
              <form>
                <h4>이메일</h4>
                <Input
                  type="email"
                  placeholder="이메일"
                  value={form.email}
                  onChange={onChange}
                  name="email"
                />
                <h4>사용자 이름</h4>
                <Input
                  placeholder="사용자 이름"
                  value={form.username}
                  onChange={onChange}
                  name="username"
                />
                <h4>비밀번호</h4>
                <Input.Password
                  placeholder="비밀번호"
                  value={form.password}
                  onChange={onChange}
                  name="password"
                />
                <h4>비밀번호 확인</h4>
                <Input.Password
                  placeholder="비밀번호 확인"
                  value={form.password_confirm}
                  onChange={onChange}
                  name="password_confirm"
                />
                <div className="button-div">
                  <Button type="primary" onClick={next}>
                    다음
                  </Button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <>
            <h2>추가 정보 입력</h2>
            <section>
              <form onSubmit={onSubmit}>
                <h4>회사</h4>
                <Input
                  placeholder="회사"
                  onChange={onChange}
                  value={form.company}
                  name="company"
                />
                <h4>파트</h4>
                <Input
                  placeholder="파트"
                  onChange={onChange}
                  value={form.department}
                  name="department"
                />
                <h4>직급</h4>
                <Input
                  placeholder="직급"
                  onChange={onChange}
                  value={form.position}
                  name="position"
                />
                <h4>국가</h4>
                <Input
                  placeholder="대한민국"
                  onChange={onChange}
                  value={form.country}
                  name="country"
                />
                <h4>전화번호</h4>
                <Input
                  type="tel"
                  placeholder="01000000000"
                  onChange={onChange}
                  value={form.tel}
                  name="tel"
                />
                <div className="button-div">
                  <Button type="primary" htmlType="submit" disabled={enable && !loading}>
                    회원가입
                  </Button>
                </div>
              </form>
            </section>
          </>
        )}
      </div>
    </AuthFormBody>
  )
}

const loginFormStyle = css`
  display: flex;

  flex: 1;
  flex-direction: column;

  background: white;
  padding: 1.5rem;
  line-height: 1.5rem;

  h2 {
    margin: 0;
    font-size: 1.3125rem;
    font-weight: bold;
  }

  h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
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
    display: flex;
    margin-top: 2.25rem;
    button {
      flex: 1;
    }
  }
`

const undoStyle = css`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
`
