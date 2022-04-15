import { Link, Navigate, useParams } from 'react-router-dom'
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
import { Button, ButtonGroup, Grid, Tooltip } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { User as UserType } from '../../lib/api/types'
import useBuddyQuery from '../../hooks/query/useBuddyQuery'
import { IoMdMail } from 'react-icons/io'
import { MdOutlineSafetyDivider, MdOutlineWork } from 'react-icons/md'
import { GrUserManager } from 'react-icons/gr'
import { getProfilebyEmail } from '../../lib/api/me/getProfile'
import { toast } from 'react-toastify'
import { addBuddy } from '../../lib/api/buddy/addBuddy'
import { AxiosError } from 'axios'
import { deleteBuddy } from '../../lib/api/buddy/deleteBuddy'
import { useRecoilState } from 'recoil'
import { eventSelectModalState } from '../../atoms/eventState'
import EventSelectModal from '../../components/Events/EventSelectModal'

export type UserProps = {}

function User({}: UserProps) {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const { data: buddyData, isLoading } = useBuddyQuery()
  const { email } = useParams<{ email: string }>()
  const [, setOpen] = useRecoilState(eventSelectModalState)
  const { data: profileData, isLoading: isLoadingProfile } = useQuery(['profile', email ?? ''], getProfilebyEmail, {
    enabled: !!email,
    retry: false,
    staleTime: 5000
  })

  const addBuddyMutation = useMutation(addBuddy, {
    onSuccess: () => {
      toast.success('Buddy added!')
      qc.invalidateQueries('buddy')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error(err.response?.data.message)
    }
  })

  const delBuddyMutation = useMutation(deleteBuddy, {
    onSuccess: () => {
      toast.success('Buddy deleted!')
      qc.invalidateQueries('buddy')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error(err.response?.data.message)
    }
  })

  const onAddNetwork = useCallback(() => {
    if (!email) return
    addBuddyMutation.mutate(email)
  }, [addBuddyMutation, email])

  const onDeleteNetwork = useCallback(() => {
    if (!email) return
    delBuddyMutation.mutate(email)
  }, [delBuddyMutation, email])

  const onRequestMeeting = useCallback(() => {
    setOpen(prev => !prev)
  }, [setOpen])

  if (isLoading || isLoadingProfile) {
    return <div>Loading...</div>
  }

  if (!email || !user || !buddyData || !profileData) {
    if (!toast.isActive('user-not-found')) {
      toast.error(`Cannot found user(${email}) information`, {
        toastId: 'user-not-found',
        pauseOnFocusLoss: false,
        pauseOnHover: false
      })
    }
    return <Navigate to={'/'} />
  }

  return (<Container>
    <UserHeader>
      <img src={gravatar.url(email, { s: '100px', d: 'retro' })} alt={email} />
      <NameMailContainer>
        <h1>{email} {user.email === email && '(나)'}</h1>
        <span>username</span>
      </NameMailContainer>
      <ButtonGroup orientation='vertical'>
        {user.email === email ? null
          : buddyData.buddy?.findIndex((elem: { email: string, profile: any }) => elem.email === email) === -1
            ? <Button variant={'contained'} onClick={onAddNetwork}>+ Add Network</Button>
            : <Button variant={'contained'} onClick={onDeleteNetwork}>- Remove From Network</Button>}
        {user.email !== email && <Button variant={'contained'} onClick={onRequestMeeting}>Request Meeting</Button>}
      </ButtonGroup>
      <Link css={mailToStyle} to={'#'} onClick={(e) => {
        window.location.href = `mailto:${email}`
        e.preventDefault()
      }}><IoMdMail /></Link>
    </UserHeader>
    <UserBody>
      <Summary>
        <h3>Summary</h3>
        <Tooltip title='Company' placement={'left'}>
          <span><MdOutlineWork />{profileData.company}</span>
        </Tooltip>
        <Tooltip title='Position' placement={'left'}>
          <span><GrUserManager /> {profileData.position}</span>
        </Tooltip>
        <Tooltip title='Department' placement={'left'}>
          <span><MdOutlineSafetyDivider /> {profileData.department}</span>
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
          {profileData.field?.map((elem: string) => (
            <FieldItem key={elem}>{elem}</FieldItem>
          ))}
        </Grid>
      </Field>
    </UserBody>
    <EventSelectModal />
  </Container>)
}

export default User