import { Link, Navigate, useParams } from 'react-router-dom'
import React from 'react'
import { useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Button, Stack } from '@mui/material'
import { ContainerBlock, MeetingSection } from './styles'
import MeetingResult from 'components/Schedules/MeetingResult'

export type MeetingDetailProps = {}

function MeetingDetail({}: MeetingDetailProps) {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery(
    ['meeting', id],
    () => getMeetingOne(id!),
    {
      retry: false,
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    }
  )

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
          <p>{data.status}</p>
        </MeetingSection>
      </ContainerBlock>
      {data.status === 'confirm' && <MeetingResult />}
    </Stack>
  )
}

export default MeetingDetail
