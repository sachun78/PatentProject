import { Navigate, useLocation } from 'react-router-dom'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getMeetingOne } from '../../lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Button, Container, Stack } from '@mui/material'
import { css } from '@emotion/react'

export type MeetingDetailProps = {}

function MeetingDetail({}: MeetingDetailProps) {
  const location = useLocation()
  const code = useMemo(() => location.pathname.split('/')[3], [location])
  const { data, isLoading, error } = useQuery(['meeting', code], () => getMeetingOne(code), {
    retry: false,
    refetchOnWindowFocus: false
  })

  if (location.pathname.split('/')[3] === '') {
    return <Navigate replace to={'/'} />
  }

  if (error) {
    if (!toast.isActive('meeting-detail')) {
      toast.error('오류가 발생했습니다.', {
        toastId: 'meeting-detail',
        pauseOnFocusLoss: false,
        pauseOnHover: false
      })
    }
    return <Navigate replace to={'/'} />
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <Container maxWidth='xs' sx={{ mt: 0, p: 3, backgroundColor: 'palegoldenrod' }} css={css`margin-top: -1rem;`}>
    <h1>{data.title}</h1>
    <section>
      <h2> Organizer</h2>
      <Stack direction='row' spacing={2}>
        <div><p>{data.ownerName}</p></div>
        <div><p>{data.ownerEmail}</p></div>
      </Stack>
    </section>
    <section>
      <h2>Participants</h2>
      <p>{data.toEmail}</p>
      <Button variant='contained'>정보확인</Button>
    </section>
    <section>
      <h2>Schedule Information</h2>
      <Stack direction='row' spacing={2}>
        <div><p>{data.date.replace(/T.*$/, '')}</p></div>
        <div><p>{new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></div>
      </Stack>
      <p>{data.location}</p>
      <p>{data.comment}</p>
      <p>{data.status}</p>
    </section>
    <Button variant='contained'>Input Result</Button>
  </Container>
}

export default MeetingDetail
