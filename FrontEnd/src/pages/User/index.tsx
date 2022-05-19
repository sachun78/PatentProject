import { Navigate, useParams } from 'react-router-dom'
import { Container } from './styles'
import React from 'react'
import { useQueryClient } from 'react-query'
import { User as UserType } from 'lib/api/types'
import EventSelectDialog from 'components/Events/EventSelectDialog'
import Header from './Header'
import UserSummary from './UserSummary'

export type UserProps = {}

function User({}: UserProps) {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const { email } = useParams<{ email: string }>()

  if (!email || !user) {
    return <Navigate to={'/'} />
  }

  return (
    <Container>
      <Header email={email} />
      <UserSummary email={email} />
      <EventSelectDialog />
    </Container>
  )
}

export default User
