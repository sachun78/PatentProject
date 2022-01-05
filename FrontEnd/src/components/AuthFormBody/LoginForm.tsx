import { css } from '@emotion/react'
import { Button, Input } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthFormBody from '.'
import { useLoginStateActions, useLoginValue } from '../../atoms/loginState'
import palette from '../../lib/palette'

type LoginFormProps = {}

export default function LoginForm({}: LoginFormProps) {
  const navigate = useNavigate()
  const loginActions = useLoginStateActions()
  const loginValue = useLoginValue()

  useEffect(() => {
    if (loginValue.isloggedIn) {
      console.log('already loggedIn')
      navigate('/')
    }
  }, [loginValue])

  const handleTypeChange = () => {
    loginActions.toggle()
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await loginActions.setLoggedIn(true)
      alert('로그인 성공')
      navigate('/')
    },
    [navigate]
  )

  return (
    <AuthFormBody width={606} height={480}>
    <div css={loginFormStyle}>
      {loginValue.loginType === 'USER' ? (
        <>
          <h2>로그인 </h2>
          <section>
            <form onSubmit={handleSubmit}>
              <h4>사용자 이름</h4>
              <Input type="email" placeholder="사용자 이름 또는 이메일" />
              <h4>비밀번호</h4>
              <Input.Password placeholder="비밀번호" />
              <div className="button-div">
                <Button type="primary" htmlType="submit">
                  로그인
                </Button>
              </div>
            </form>
          </section>


          <section>
            <div css={underBlockStyle}>
              <NavLink to={'/register'}>
                <h4>회원가입</h4>
              </NavLink>
              <h4>비밀번호 찾기</h4>
            </div>
          </section>
        </>
      ) : (
        <>
          <h2>비회원 로그인 </h2>
          <section>
            <form onSubmit={handleSubmit}>
              <h4>사용자 이름</h4>
              <Input type="email" placeholder="사용자 이름 또는 이메일" />
              <h4>전화번호</h4>
              <Input.Password placeholder="비밀번호" />
              <div className="button-div">
                <Button type="primary" htmlType="submit">
                  시작하기
                </Button>
              </div>
            </form>
          </section>
        </>
      )}
      <div className="foot">
        {loginValue.loginType === 'USER' ? (
          <span>비회원으로</span>
        ) : (
          <span>회원으로</span>
        )}
        <div className="link" onClick={handleTypeChange}>
          로그인
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

  background: white;
  padding: 1.5rem;
  margin-top: 2.25rem;
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

  .ant-input-password {
    margin-bottom: 1.5rem;
  }

  section {
    margin-bottom: 0.5rem;
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

    button {
      flex: 1;
    }
  }
`

const underBlockStyle = css`
  display: flex;
  justify-content: space-around;
`
