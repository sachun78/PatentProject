import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import React, { useCallback, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Box, Button, Stack } from '@mui/material'
import { ContainerBlock, MeetingSection } from './styles'
import sendResult from '../../lib/api/meeting/sendResult'

export type MeetingDetailProps = {}

function MeetingDetail({}: MeetingDetailProps) {
  const location = useLocation()
  const navi = useNavigate()
  const code = useMemo(() => location.pathname.split('/')[3], [location])
  const { data, isLoading, error, refetch } = useQuery(
    ['meeting', code],
    () => getMeetingOne(code),
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    }
  )

  const replanResponseMut = useMutation(sendResult, {
    onSuccess: () => {
      toast.success('정상적으로 전송되었습니다.')
      refetch()
    },
    onError: (err) => {
      console.dir(err)
      toast.error('error')
    },
  })

  const onResult = useCallback(() => {
    navi('result')
  }, [])

  const onConfirm = useCallback(() => {
    if (!data) return
    replanResponseMut.mutate({ status: 'confirm', meetingId: data.id })
  }, [data, replanResponseMut])

  const onCancel = useCallback(() => {
    if (!data) return
    replanResponseMut.mutate({ status: 'cancel', meetingId: data.id })
  }, [data, replanResponseMut])

  if (location.pathname.split('/')[3] === '') {
    return <Navigate replace to={'/'} />
  }

  if (error) {
    if (!toast.isActive('meeting-detail')) {
      toast.error('오류가 발생했습니다.', {
        toastId: 'meeting-detail',
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      })
    }
    return <Navigate replace to={'/'} />
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Stack direction={'row'}>
      <ContainerBlock>
        <h1>
          {data.title} [{data.status}]
        </h1>
        <MeetingSection>
          <h2>Organizer</h2>
          <p>{data.ownerEmail}</p>
        </MeetingSection>
        <MeetingSection>
          <h2>Participants</h2>
          <Stack direction="row" spacing={2} style={{ alignItems: 'center' }}>
            <p>{data.toEmail}</p>
            <Link to={`/u/${data.toEmail}`} style={{ height: '18px' }}>
              <Button variant="contained" style={{ height: '18px' }}>
                INFO
              </Button>
            </Link>
          </Stack>
        </MeetingSection>
        <MeetingSection>
          <h2>Schedule Information</h2>
          <p>{data.location}</p>
          <p>
            {data.date.replace(/T.*$/, '')}
            {new Date(data.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </MeetingSection>
        <MeetingSection>
          <h2>Request Message</h2>
          <p> {data.comment}</p>
        </MeetingSection>
        <Box display="flex" justifyContent="space-between">
          {data.status === 'confirm' && (
            <Button variant="contained" onClick={onResult}>
              Result
            </Button>
          )}
          {data.status === 'replan' && (
            <>
              <Button
                variant="contained"
                style={{ width: '180px' }}
                onClick={onConfirm}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                style={{ width: '180px', backgroundColor: '#9C9C9C' }}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </ContainerBlock>
    </Stack>
  )
}

export default MeetingDetail
