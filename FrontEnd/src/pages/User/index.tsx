import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ButtonBlock,
  Container,
  Field,
  FieldItem,
  InnerBlock,
  Middle,
  NameMailContainer,
  Summary,
  UserBody,
  UserHeader,
} from './styles'
import React, { useCallback } from 'react'
import { Grid, Tooltip } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { User as UserType } from 'lib/api/types'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import { getProfilebyEmail } from 'lib/api/me/getProfile'
import { toast } from 'react-toastify'
import { addBuddy } from 'lib/api/buddy/addBuddy'
import { AxiosError } from 'axios'
import { deleteBuddy } from 'lib/api/buddy/deleteBuddy'
import { useRecoilState } from 'recoil'
import { eventSelectModalState } from 'atoms/eventState'
import { useMeetingReqUser } from 'atoms/meetingReqState'
import getCountryName from 'lib/countryName'
import randomColor from 'randomcolor'
import { brandColor } from 'lib/palette'
import EventSelectDialog from 'components/Events/EventSelectDialog'
import { url } from 'gravatar'
import { API_PATH } from 'lib/api/client'

export type UserProps = {}

function User({}: UserProps) {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const { data: buddyData, isLoading } = useBuddyQuery()
  const { email } = useParams<{ email: string }>()
  const [, setOpen] = useRecoilState(eventSelectModalState)
  const [, setMeetuser] = useMeetingReqUser()
  const { data: profileData, isLoading: isLoadingProfile } = useQuery(['profile', email ?? ''], getProfilebyEmail, {
    enabled: !!email,
    retry: false,
    staleTime: 5000,
  })

  const addBuddyMutation = useMutation(addBuddy, {
    onSuccess: () => {
      toast.success('Buddy added!')
      qc.invalidateQueries('buddy')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error(err.response?.data.message)
    },
  })

  const delBuddyMutation = useMutation(deleteBuddy, {
    onSuccess: () => {
      toast.success('Buddy deleted!')
      qc.invalidateQueries('buddy')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error(err.response?.data.message)
    },
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
    setOpen((prev) => !prev)
    setMeetuser(email ?? '')
  }, [email, setMeetuser, setOpen])

  if (isLoading || isLoadingProfile) {
    return <div>Loading...</div>
  }

  if (!email || !user || !buddyData || !profileData) {
    if (!toast.isActive('user-not-found')) {
      toast.error(`Cannot found user(${email}) information`, {
        toastId: 'user-not-found',
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      })
    }
    return <Navigate to={'/'} />
  }

  return (
    <Container>
      <UserHeader>
        <img
          src={`${API_PATH}static/${email}`}
          alt={email}
          crossOrigin={'anonymous'}
          onError={(e) => {
            e.currentTarget.src = url(email ?? '', { s: `60px`, d: 'retro' })
          }}
        />
        <InnerBlock>
          <NameMailContainer>
            <h1>
              {profileData.username} {user.email === email && '(나)'}
            </h1>
            <span>{email}</span>
          </NameMailContainer>
          <ButtonBlock>
            {user.email === email ? null : !buddyData.buddy ||
              buddyData.buddy?.findIndex((elem: { email: string; profile: any }) => elem.email === email) === -1 ? (
              <button disabled={addBuddyMutation.isLoading} onClick={onAddNetwork}>
                <img src={'/assets/follow.png'} alt={'follow'} />
              </button>
            ) : (
              <button
                disabled={delBuddyMutation.isLoading}
                onClick={onDeleteNetwork}
                style={{ backgroundColor: brandColor }}
              >
                <img src={'/assets/follow-1.png'} alt={'follow-1'} />
              </button>
            )}
            {user.email !== email && (
              <button onClick={onRequestMeeting}>
                {' '}
                <img src={'/assets/invite.png'} alt={'invite'} />
              </button>
            )}
            {user.email !== email && (
              <button>
                <Link
                  to={'#'}
                  onClick={(e) => {
                    window.location.href = `mailto:${email}`
                    e.preventDefault()
                  }}
                >
                  <img src={'/assets/email.png'} alt={'email'} />
                </Link>
              </button>
            )}
          </ButtonBlock>
        </InnerBlock>
      </UserHeader>
      <UserBody>
        <Summary>
          <h3>Summary</h3>
          <Tooltip title="Company" placement={'left'}>
            <span>
              <img src={'/assets/company.png'} alt={'company'} />
              {profileData.company}
            </span>
          </Tooltip>
          <Tooltip title="Position" placement={'left'}>
            <span>
              <img src={'/assets/position.png'} alt={'Position'} />
              {profileData.position}
            </span>
          </Tooltip>
          <Tooltip title="Department" placement={'left'}>
            <span>
              <img src={'/assets/department.png'} alt={'Department'} /> {profileData.department}
            </span>
          </Tooltip>
          <Tooltip title="Country" placement={'left'}>
            <span>
              <img src={'/assets/country.png'} alt={'Country'} /> {getCountryName(profileData.country!)}
            </span>
          </Tooltip>
          <Tooltip title="Wemet" placement={'left'}>
            <span>
              <img src={'/assets/meeting.png'} alt={'Wemet'} /> 0
            </span>
          </Tooltip>
        </Summary>
        <Middle>
          <div className="career-summary">
            <h3>About</h3>
            <pre>
              LONGLONG LONGLONG LONGLONG TEXT LONGLONG LONGLONG LONGLONG TEXT LONGLONG LONGLONG LONGLONG TEXT LONGLONG
              LONGLONG LONGLONG TEXT LONGLONG LONGLONG LONGLONG TEXT LONGLONG LONGLONG LONGLONG TEXT
            </pre>
          </div>
          <div className="History">
            <h3>Previous Meeting</h3>
          </div>
        </Middle>
        <Field>
          <h3>Field</h3>
          <Grid container>
            {profileData.field?.map((elem: string) => {
              const color = randomColor({
                hue: brandColor,
                format: 'rgb', // e.g. 'rgb(225,200,20)'
                seed: elem,
              })
              return (
                <FieldItem key={elem} color={color}>
                  {elem}
                </FieldItem>
              )
            })}
          </Grid>
        </Field>
      </UserBody>
      <EventSelectDialog />
    </Container>
  )
}

export default User
