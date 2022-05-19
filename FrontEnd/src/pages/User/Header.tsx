import { ButtonBlock, InnerBlock, NameMailContainer, UserHeader } from './styles'
import { API_PATH } from 'lib/api/client'
import { url } from 'gravatar'
import { brandColor } from 'lib/palette'
import { Link, Navigate } from 'react-router-dom'
import React, { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getProfilebyEmail } from 'lib/api/me/getProfile'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import { User as UserType } from 'lib/api/types'
import { useRecoilState } from 'recoil'
import { eventSelectModalState } from 'atoms/eventState'
import { useMeetingReqUser } from 'atoms/meetingReqState'
import { addBuddy } from 'lib/api/buddy/addBuddy'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { deleteBuddy } from 'lib/api/buddy/deleteBuddy'

export type HeaderProps = {
  email: string
}

function Header({ email }: HeaderProps) {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const [, setOpen] = useRecoilState(eventSelectModalState)
  const [, setMeetuser] = useMeetingReqUser()

  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery(['profile', email], getProfilebyEmail, {
    retry: false,
    staleTime: 5000,
  })

  const { data: buddyData, isLoading, error } = useBuddyQuery()

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

  if (error || profileError) {
    if (!toast.isActive('user-not-found')) {
      toast.error(`Not Exist User`, {
        toastId: 'user-not-found',
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      })
    }
    return <Navigate to={'/'} />
  }

  if (!user || !profileData || !buddyData) {
    return null
  }

  return (
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
  )
}

export default Header
