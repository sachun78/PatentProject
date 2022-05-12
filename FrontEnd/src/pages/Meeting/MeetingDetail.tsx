import { Link, Navigate, useParams } from 'react-router-dom'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Button, Stack } from '@mui/material'
import { ContainerBlock, MeetingSection, ScheduleInfoBlock, StatusBlock } from './styles'
import MeetingResult from 'components/Schedules/MeetingResult'
import { IMeeting } from 'lib/api/types'
import { format, formatDistanceToNow, isBefore } from 'date-fns'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

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
    return isBefore(new Date(data.startTime), new Date()) && data.status === 'confirm'
  }, [data])

  if (!id) {
    return <Navigate replace to={'/'} />
  }

  if (error) {
    if (!toast.isActive('meeting-detail')) {
      toast.error('Error.', {
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
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <p>{data.toEmail}</p>
            <Link to={`/u/${data.toEmail}`}>
              <Button variant="contained" size={'small'}>
                INFO
              </Button>
            </Link>
          </Stack>
        </MeetingSection>
        <MeetingSection>
          <h2>Schedule Information</h2>
          <ScheduleInfoBlock>
            <CalendarMonthOutlinedIcon /> {format(new Date(data?.date), 'EEEE, d MMM, yyyy')}
          </ScheduleInfoBlock>
          <ScheduleInfoBlock>
            <AccessTimeIcon />
            {format(new Date(data.startTime), 'HH:mm') + ' - ' + format(new Date(data.endTime), 'HH:mm')}
          </ScheduleInfoBlock>
          <ScheduleInfoBlock>
            <PlaceOutlinedIcon /> {data.location}
          </ScheduleInfoBlock>
        </MeetingSection>
        <MeetingSection>
          <h2>Message</h2>
          <div className={'multiline'}>{data.comment} </div>
        </MeetingSection>
        <MeetingSection>
          <h2>State</h2>
          <StatusBlock state={data.status}>
            {data.status !== 'none' ? data.status : isExpired ? 'expired' : 'pending'}
          </StatusBlock>
          <Button>Confirm</Button> <Button>Cancel</Button> <Button>Change</Button>
        </MeetingSection>
      </ContainerBlock>

      {isResult && <MeetingResult />}
    </Stack>
  )
}

export default MeetingDetail
