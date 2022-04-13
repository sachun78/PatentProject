import { Link, useParams } from 'react-router-dom'
import {
  Container,
  Field,
  FieldItem,
  mailToStyle,
  Middle,
  NameMailContainer,
  Summary,
  UserBody,
  UserHeader
} from './styles'
import gravatar from 'gravatar'
import React, { useCallback } from 'react'
import { Button, Grid, Tooltip } from '@mui/material'
import { useQueryClient } from 'react-query'
import { User as UserType } from '../../lib/api/types'
import useBuddyQuery from '../../hooks/query/useBuddyQuery'
import { IoMdMail } from 'react-icons/io'
import { MdOutlineSafetyDivider, MdOutlineWork } from 'react-icons/md'
import { GrUserManager } from 'react-icons/gr'

export type UserProps = {}

function User({}: UserProps) {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const { data: buddyData, isLoading } = useBuddyQuery()
  const { email } = useParams<{ email: string }>()

  const onAddNetwork = useCallback(() => {
    alert('add network')
  }, [])

  if (!email || !user || !buddyData) {
    return null
  }

  return (<Container>
    <UserHeader>
      <img src={gravatar.url(email, { s: '100px', d: 'retro' })} alt={email} />
      <NameMailContainer>
        <h1>{email} {user.email === email && '(나)'}</h1>
        <span>username</span>
      </NameMailContainer>
      {user.email !== email &&
      buddyData.buddy?.findIndex((elem: { email: string, profile: any }) => elem.email === email) === -1
        ? <Button onClick={onAddNetwork}>+ Add Network</Button>
        : <Button onClick={onAddNetwork}>- Remove From Network</Button>
      }
      <Link css={mailToStyle} to={'#'} onClick={(e) => {
        window.location.href = `mailto:${email}`
        e.preventDefault()
      }}><IoMdMail /></Link>
    </UserHeader>
    <UserBody>
      <Summary>
        <h3>Summary</h3>
        <Tooltip title='Company' placement={'left'}>
          <span><MdOutlineWork />Company</span>
        </Tooltip>
        <Tooltip title='Position' placement={'left'}>
          <span><GrUserManager /> Position</span>
        </Tooltip>
        <Tooltip title='Department' placement={'left'}>
          <span><MdOutlineSafetyDivider /> Department</span>
        </Tooltip>
      </Summary>
      <Middle>
        <div className='career-summary'>
          <h3>About</h3>
          <pre>LONGLONG LONGLONG LONGLONG TEXT
            LONGLONG LONGLONG LONGLONG TEXT
            LONGLONG LONGLONG LONGLONG TEXT LONGLONG LONGLONG LONGLONG TEXT
          LONGLONG LONGLONG LONGLONG TEXT
          LONGLONG LONGLONG LONGLONG TEXT</pre>
        </div>
        <div className='History'>
          <h3> History with me</h3>
        </div>
      </Middle>
      <Field>
        <h3>Fields</h3>
        <Grid container>
          <FieldItem>Field1</FieldItem>
          <FieldItem>Field2</FieldItem>
          <FieldItem>Field2</FieldItem>
          <FieldItem>LONGLONG Field2</FieldItem>
          <FieldItem>LONGLONG LONGLONG LONGLONG Field2</FieldItem>
          <FieldItem>LONGLONG LONGLONG LONGLONG Field2LONGLONG LONGLONG LONGLONG</FieldItem>
          <FieldItem>Field3</FieldItem>
        </Grid>
      </Field>
    </UserBody>
  </Container>)
}

export default User
