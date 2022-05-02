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
  UserHeader,
} from './styles'
import React, { useCallback } from 'react'
import { Button, ButtonGroup, Grid, Tooltip } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { User as UserType } from 'lib/api/types'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import { IoMdMail } from 'react-icons/io'
import { MdOutlineSafetyDivider, MdOutlineWork, MdPersonAdd, MdPersonRemove } from 'react-icons/md'
import { GrUserManager } from 'react-icons/gr'
import { getProfilebyEmail } from 'lib/api/me/getProfile'
import { toast } from 'react-toastify'
import { addBuddy } from 'lib/api/buddy/addBuddy'
import { AxiosError } from 'axios'
import { deleteBuddy } from 'lib/api/buddy/deleteBuddy'
import { useRecoilState } from 'recoil'
import { eventSelectModalState } from 'atoms/eventState'
import EventSelectDialog from 'components/Events/EventSelectDialog'
import { useMeetingReqUser } from 'atoms/meetingReqState'
import getCountryName from '../../lib/countryName'
import { BiWorld } from 'react-icons/bi'
import { useImg } from '../../hooks/useProfileImg'
import randomColor from 'randomcolor'

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
  const image_src = useImg(profileData?.photo_path, email)
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
        <img src={image_src.profileSrc} alt={email} crossOrigin={'anonymous'} />
        <NameMailContainer>
          <h1>
            {email} {user.email === email && '(나)'}
          </h1>
          <span>{profileData.username}</span>
        </NameMailContainer>
        <ButtonGroup variant="outlined">
          {user.email === email ? null : !buddyData.buddy ||
            buddyData.buddy?.findIndex((elem: { email: string; profile: any }) => elem.email === email) === -1 ? (
            <Button disabled={addBuddyMutation.isLoading} onClick={onAddNetwork} variant={'contained'}>
              <MdPersonAdd />
            </Button>
          ) : (
            <Button disabled={delBuddyMutation.isLoading} onClick={onDeleteNetwork}>
              <MdPersonRemove />
            </Button>
          )}
          {user.email !== email && (
            <Button onClick={onRequestMeeting} variant={'contained'}>
              Request Meeting
            </Button>
          )}
        </ButtonGroup>
        {user.email !== email && (
          <Link
            css={mailToStyle}
            to={'#'}
            onClick={(e) => {
              window.location.href = `mailto:${email}`
              e.preventDefault()
            }}
          >
            <IoMdMail />
          </Link>
        )}
      </UserHeader>
      <UserBody>
        <Summary>
          <h3>Summary</h3>
          <Tooltip title="Company" placement={'left'}>
            <span>
              <MdOutlineWork />
              {profileData.company}
            </span>
          </Tooltip>
          <Tooltip title="Position" placement={'left'}>
            <span>
              <GrUserManager /> {profileData.position}
            </span>
          </Tooltip>
          <Tooltip title="Department" placement={'left'}>
            <span>
              <MdOutlineSafetyDivider /> {profileData.department}
            </span>
          </Tooltip>
          <Tooltip title="Country" placement={'left'}>
            <span>
              <BiWorld /> {getCountryName(profileData.country!)}
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
          <h3>Fields</h3>
          <Grid container>
            {profileData.field?.map((elem: string) => {
              const color = randomColor({
                luminosity: 'light',
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
