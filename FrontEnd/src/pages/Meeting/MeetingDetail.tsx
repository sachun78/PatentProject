import { Link, Navigate, useParams } from 'react-router-dom'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Button, Stack } from '@mui/material'
import { ContainerBlock, MeetingSection, StatusBlock } from './styles'
import MeetingResult from 'components/Schedules/MeetingResult'
import { IMeeting } from 'lib/api/types'
import { format, formatDistanceToNow } from 'date-fns'

export type MeetingDetailProps = {}

function MeetingDetail({}: MeetingDetailProps) {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery<IMeeting>(['meeting', id], () => getMeetingOne(id!), {
    retry: false,
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  })

  const isExpired = useMemo(() => {
    if (!data) return false
    const dist = formatDistanceToNow(new Date(data.startTime), {
      addSuffix: true,
    })
    return dist.includes('ago')
  }, [data])

  const isResult = useMemo(() => {
    if (!data) return false
    const dist = formatDistanceToNow(new Date(data?.startTime), { addSuffix: true })
    return dist.includes('ago') && (data.status === 'confirm' || data.status === 'replan')
  }, [data])

  if (!id) {
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

  if (!data) {
    return <div>Meeting not valid</div>
  }

  return (
    <Stack direction={'row'} spacing={2}>
      <ContainerBlock>
        <h1>{data.title}</h1>
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
            {format(new Date(data?.date), 'yyyy-MM-dd') + ' '}
            {new Date(data.startTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            {' ~ '}
            {new Date(data.endTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </MeetingSection>
        <MeetingSection>
          <h2>Message</h2>
          <div className={'multiline'}>{data.comment} </div>
        </MeetingSection>
        <MeetingSection>
          <h2>Status</h2>
          <div>
            <StatusBlock state={data.status}>
              {data.status !== 'none' ? data.status : isExpired ? 'expired' : 'pending'}
            </StatusBlock>
          </div>
        </MeetingSection>
      </ContainerBlock>
      {isResult && <MeetingResult />}
    </Stack>
  )
}

export default MeetingDetail
