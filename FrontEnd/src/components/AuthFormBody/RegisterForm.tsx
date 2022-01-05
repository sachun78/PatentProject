import { css } from '@emotion/react'
import { Button, Input } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import palette from '../../lib/palette'
import IconControl from '../IconControl'

type RegisterFormProps = {}

export default function RegisterForm({}: RegisterFormProps) {
  return (
    <div css={loginFormStyle}>
      <div css={undoStyle}>
        <NavLink to={'/login'} className="link">
          <IconControl name={'undo'} />
        </NavLink>
      </div>
      <h2>회원가입</h2>
      <section>
        <form>
          <h4>사용자 이름</h4>
          <Input placeholder="사용자 이름" />
          <h4>이메일</h4>
          <Input type="email" placeholder="이메일" />
          <h4>비밀번호</h4>
          <Input.Password placeholder="비밀번호" />
          <h4>비밀번호 확인</h4>
          <Input.Password placeholder="비밀번호 확인" />
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
            <Button type="primary" htmlType="submit">
              회원 가입
            </Button>
          </div>
        </form>
      </section>
    </div>
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
      color: red;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .button-div {
    display: flex;
    margin-top: 1rem;
    button {
      flex: 1;
    }
  }
`

const undoStyle = css`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`
