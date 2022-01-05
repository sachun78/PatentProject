import { css } from '@emotion/react'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthFormBody from '.'
import useInputs from '../../hooks/useInputs'
import palette from '../../lib/palette'
import IconControl from '../IconControl'

type RegisterFormProps = {}

export default function RegisterForm({}: RegisterFormProps) {
  const [form, onChange] = useInputs({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  const [type, setType] = useState<'default' | 'additional'>('default')

  const toggle = () => {
    const text = type === 'default' ? 'additional' : 'default'
    setType(text)
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
                <h4>사용자 이름</h4>
                <Input
                  placeholder="사용자 이름"
                  value={form.username}
                  onChange={onChange}
                  name="username"
                />
                <h4>이메일</h4>
                <Input
                  type="email"
                  placeholder="이메일"
                  value={form.email}
                  onChange={onChange}
                  name="email"
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
                  <Button type="primary" onClick={toggle}>
                    다음
                  </Button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <>
            <h2>추가 정보</h2>
            <section>
              <form>
                <h4>회사</h4>
                <Input placeholder="회사" />
                <h4>파트</h4>
                <Input placeholder="파트" />
                <h4>직급</h4>
                <Input placeholder="직급" />
                <h4>전화번호</h4>
                <Input type="tel" placeholder="010-0000-0000" />
                <h4>국가</h4>
                <Input placeholder="사용자 이름 또는 이메일" />
                <div className="button-div">
                  <Button type="primary" htmlType="submit" disabled>
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

  section + section {
    margin-top: 0;
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
  /* margin-bottom: 0.75rem; */
`
