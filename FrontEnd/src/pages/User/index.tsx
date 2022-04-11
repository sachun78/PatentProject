import { useParams } from 'react-router-dom'
import { Container, NameMailContainer, UserBody, UserHeader } from './styles'
import gravatar from 'gravatar'
import React, { useCallback } from 'react'
import { Button } from '@mui/material'
import { useQueryClient } from 'react-query'
import { User as UserType } from '../../lib/api/types'

export type UserProps = {}

function User({}: UserProps) {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const { email } = useParams<{ email: string }>()
  console.log(email)

  const onAddNetwork = useCallback(() => {
    alert('add network')
  }, [])

  if (!email || !user) {
    return null
  }

  return <Container>
    <UserHeader>
      <img src={gravatar.url(email, { s: '100px', d: 'retro' })} alt={email} />
      <NameMailContainer>
        <h1>{email} {user.email === email && '(나)'}</h1>
        <span>username</span>
      </NameMailContainer>
      {user.email !== email && <Button onClick={onAddNetwork}>+ Add Network</Button>}
    </UserHeader>
    <UserBody>
      <div className='company'>Company</div>
      <div className='position'>Position</div>
      <div className='career-summary'>Career</div>
      <div className='History'>History with me</div>
    </UserBody>
  </Container>
}

export default User
