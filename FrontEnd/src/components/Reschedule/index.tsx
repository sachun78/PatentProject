import React, { useCallback, useMemo, useState } from 'react'
import useUserQuery from 'hooks/query/useUserQuery'
import { Button, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import { inputStyle } from 'pages/Login/styles'
import useInput from 'hooks/useInput'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { signin } from 'lib/api/auth/signin'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getMeetingInfoByCode } from 'lib/api/meeting/getMeetingInfoByCode'
import BookingSide from '../Booking/BookingSide'
import BookingReplanMain from '../Booking/BookingRepalnMain'
import { wrapper } from '../Booking/styles'
import { IMeeting } from '../../lib/api/types'
import { useRecoilState } from 'recoil'
import { replanState } from '../../atoms/replanState'

export type MeetingRescheduleProps = {}

function MeetingReschedule({}: MeetingRescheduleProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [param] = useSearchParams()
  const code = useMemo(() => param.get('code'), [param])

  const { data: userData } = useUserQuery()
  const {
    data: meetingData,
    isLoading,
    isError
  } = useQuery<IMeeting>(['meeting', code ?? ''], () => getMeetingInfoByCode(code ?? ''), {
    enabled: !!userData,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.toEmail !== userData?.email) {
        toast.error('본인이 예약한 일정만 수정할 수 있습니다.')
      }
    }
  })
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')
  const queryClient = useQueryClient()
  const navi = useNavigate()
  const [replan, setReplan] = useRecoilState(replanState)
  const mutation = useMutation(signin, {
    onSuccess: (res) => {
      console.log(res.user)
      toast('Login Success', { type: 'success', position: 'top-right', autoClose: 2000, hideProgressBar: true })
      queryClient.setQueryData('user', res.user)
      toggleLoginModal()
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true
      })
    }
  })

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    mutation.mutate({ email, password })
  }, [email, mutation, password])

  const toggleLoginModal = useCallback(() => {
    setLoginModalOpen(prev => !prev)
  }, [])

  const onNavigateSignup = useCallback(() => {
    navi('/email/check')
    setReplan({
      code: code ?? ''
    })
  }, [code, navi, setReplan])

  if (!userData) {
    return <div>
      <h1>Replan Need Login</h1>
      <Stack alignItems={'stretch'} spacing={2} direction={'row'}>
        <Button onClick={toggleLoginModal}>Login</Button>
        <Button onClick={onNavigateSignup}>Sign up</Button>
      </Stack>
      <Modal open={loginModalOpen} onClose={toggleLoginModal}>
        <Paper sx={{ width: '50%' }}>
          <Typography id='modal-modal-title' variant='h2' component='h2'> Login </Typography>
          <form onSubmit={onSubmit}>
            <TextField label='Email' variant='outlined' type='email' name='email'
                       value={email} onChange={onChangeEmail} css={inputStyle}
                       InputProps={{ style: { fontSize: 15 } }} />
            <TextField label='Password' variant='outlined' type='password' name='password'
                       value={password} onChange={onChangePassword} css={inputStyle}
                       autoComplete='password' InputProps={{ style: { fontSize: 15 } }} />
            <Button type='submit'>Login</Button>
          </form>
        </Paper>
      </Modal>
    </div>
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  if (userData.email !== meetingData?.toEmail) {
    return <div>you are not proposed this meeting</div>
  }

  return <div css={wrapper}>
    <BookingSide meeting={meetingData} />
    <BookingReplanMain meeting={meetingData} />
  </div>
}

export default MeetingReschedule
