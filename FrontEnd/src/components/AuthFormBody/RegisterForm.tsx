import { css } from '@emotion/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthFormBody from '.'
import palette from '../../lib/palette'
import IconControl from '../IconControl'
import RegisterFormDefault from './RegisterFormDefault'

type RegisterFormProps = {}

export default function RegisterForm({}: RegisterFormProps) {
  const [type, setType] = useState<'default' | 'success'>('default')

  const toggle = () => {
    const text = type === 'default' ? 'success' : 'default'
    setType(text)
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
        <RegisterFormDefault />
      </div>
    </AuthFormBody>
  )
}

//TODO: signup page layout
const loginFormStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
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
