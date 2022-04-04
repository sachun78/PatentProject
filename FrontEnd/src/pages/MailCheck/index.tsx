import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Navigate, NavLink } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import { signupFormStyle, undoStyle } from 'pages/Signup/styles'
import Auth from 'layouts/Auth'
import useUserQuery from 'hooks/query/useUserQuery'
import { Button } from '@mui/material'
import { useRecoilState } from 'recoil'
import { replanState } from '../../atoms/replanState'
import MailCheckForm from './mailcheck-form/MailCheckForm'

type RegisterProps = {}

export default function MailCheck({}: RegisterProps) {
  const { data } = useUserQuery()
  const [sendMail, setSendMail] = useState(false)
  const [replan] = useRecoilState(replanState)

  const onSendmail = useCallback(()=> {
    setSendMail(true)
  }, [])

  if (data) {
    if (replan?.code) {
      return <Navigate replace to={'/invitation/replan?code=' + replan.code} />
    } else
      return <Navigate replace to={'/'} />
  }

  return (
    <div css={wrapper}>
      <Auth width={800} height={360}>
        <div css={signupFormStyle}>
          <div css={undoStyle}>
            <NavLink to={'/login'} className='link'> <span>Back</span> </NavLink>
          </div>
          {sendMail
            ? <div>
              <h2 className='title'>Check Email</h2>
              <p>We sent a verification email</p>
              <p>Please check your email and click the link to verify your email address.</p>
              <Button variant='contained' size='large'>OK</Button>
            </div>
            : <MailCheckForm onSendmail={onSendmail} />}
        </div>
      </Auth>
    </div>
  )
}

const wrapper = css`
  background-color: ${palette.purple[50]};
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;

  align-items: center;
  justify-content: center;
`
