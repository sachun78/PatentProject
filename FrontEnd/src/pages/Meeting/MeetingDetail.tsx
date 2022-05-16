import { Link, Navigate, useParams } from 'react-router-dom'
import React, { useCallback, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Button, Divider, Stack, ToggleButton } from '@mui/material'
import { ContainerBlock, MeetingSection, ScheduleInfoBlock } from './styles'
import MeetingResult from 'components/Schedules/MeetingResult'
import { IMeeting } from 'lib/api/types'
import { format, isBefore } from 'date-fns'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import { SaveBlock, useButtonStyle } from 'components/ProfileMenu/ProfileCardSave'
import { updateMeeting } from 'lib/api/meeting/updateMeeting'
import MeetingChange from 'components/Schedules/MeetingChange'
import useToggle from 'hooks/useToggle'

export type MeetingDetailProps = {}

function MeetingDetail({}: MeetingDetailProps) {
  const { id } = useParams()
  const [change, onChangeToggle] = useToggle(false)
  const { data, isLoading, error, refetch } = useQuery<IMeeting>(['meeting', id], () => getMeetingOne(id!), {
    retry: false,
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  })

  const isExpired = useMemo(() => {
    if (!data) return false
    return isBefore(new Date(data.startTime), new Date())
  }, [data])

  const isResult = useMemo(() => {
    if (!data) return false
    return isBefore(new Date(data.startTime), new Date()) && data.status === 'confirm'
  }, [data])

  const finalMut = useMutation(updateMeeting, {
    onSuccess: () => {
      refetch()
    },
    onError: () => {},
  })

  const onResult = useCallback(
    (type: string) => () => {
      finalMut.mutate({ meetingId: id!, status: type })
    },
    [finalMut, id]
  )

  const classes = useButtonStyle()

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
    return null
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
            <Link to={`/u/${data.toEmail}`} style={{ textDecoration: 'none' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2>state:{data.status !== 'none' ? data.status : isExpired ? 'expired' : 'pending'}</h2>
            {!isResult && !isExpired && (data.status === 'confirm' || data.status === 'replan') && (
              <ToggleButton value={change} onChange={onChangeToggle} size={'small'}>
                Change {change ? '<' : '>'}
              </ToggleButton>
            )}
          </div>
          {data.status === 'replan' && <Divider />}
          {!isExpired && data.status === 'replan' && (
            <SaveBlock style={{ justifyContent: 'space-between' }}>
              <Button
                variant={'contained'}
                classes={classes}
                onClick={onResult('confirm')}
                disabled={finalMut.isLoading}
              >
                Confirm
              </Button>
              <Button
                variant={'contained'}
                classes={classes}
                onClick={onResult('cancel')}
                disabled={finalMut.isLoading}
              >
                Cancel
              </Button>
            </SaveBlock>
          )}
        </MeetingSection>
      </ContainerBlock>
      {isResult ? <MeetingResult /> : change && <MeetingChange place={data.location} eventId={data.eventId} />}
    </Stack>
  )
}

export default MeetingDetail
