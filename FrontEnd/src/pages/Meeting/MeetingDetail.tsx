import { Navigate, useParams } from 'react-router-dom'
import React, { useCallback, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Button, Divider, Stack } from '@mui/material'
import { ContainerBlock, InfoLink, MeetingSection, RescheduleButton, ScheduleInfoBlock } from './styles'
import MeetingResult from 'components/Schedules/MeetingResult'
import { IMeeting } from 'lib/api/types'
import { format, isBefore } from 'date-fns'
import { SaveBlock, useButtonStyle } from 'components/ProfileMenu/ProfileCardSave'
import { updateMeeting } from 'lib/api/meeting/updateMeeting'
import MeetingChange from 'components/Schedules/MeetingChange'
import useToggle from 'hooks/useToggle'
import IconControl from '../../components/IconControl'

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

  const finalMut = useMutation(updateMeeting, {
    onSuccess: () => {
      refetch()
    },
    onError: () => {},
  })

  const isExpired = useMemo(() => {
    if (!data) return false
    return isBefore(new Date(data.startTime), new Date())
  }, [data])

  const isResult = useMemo(() => {
    if (!data) return false
    return isBefore(new Date(data.startTime), new Date()) && data.status === 'confirm'
  }, [data])

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
          <Stack direction="row" spacing={'10px'} sx={{ alignItems: 'center' }}>
            <p>{data.ownerName}</p>
            <div className={'divider'}></div>
            <p className={'email'}>{data.ownerEmail}</p>
          </Stack>
        </MeetingSection>
        <MeetingSection>
          <h2>Participant</h2>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <p>{data.toName ? data.toName : '/name is empty/'}</p>
            <div className={'divider'}></div>
            <p className={'email'}>{data.toEmail}</p>
            {data.isPaidUser && (
              <InfoLink to={`/u/${data.toEmail}`}>
                <IconControl name={'infoUser'} style={{ marginRight: '3px' }} />
                info
              </InfoLink>
            )}
          </Stack>
          <ScheduleInfoBlock>
            <IconControl name={'company'} style={{ minWidth: '22px' }} /> {data.ownerCompany}
          </ScheduleInfoBlock>
          <ScheduleInfoBlock>
            <IconControl name={'phone'} style={{ minWidth: '22px' }} /> {data.ownerPhone}
          </ScheduleInfoBlock>
        </MeetingSection>
        <MeetingSection>
          <h2>Schedule Information</h2>
          <ScheduleInfoBlock>
            <IconControl name={'date'} /> {format(new Date(data?.date), 'EEEE, d MMM, yyyy')}
          </ScheduleInfoBlock>
          <ScheduleInfoBlock>
            <IconControl name={'time'} />
            {format(new Date(data.startTime), 'HH:mm') + ' - ' + format(new Date(data.endTime), 'HH:mm')}
          </ScheduleInfoBlock>
          <ScheduleInfoBlock>
            <IconControl name={'place'} style={{ minWidth: '22px' }} /> {data.location}
          </ScheduleInfoBlock>
        </MeetingSection>
        <MeetingSection>
          <h2>Message</h2>
          <div className={'multiline'}>{data.comment} </div>
        </MeetingSection>
        <MeetingSection>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>
              State
              <span className={'state-text'}>
                {data.status !== 'none' ? data.status : isExpired ? 'expired' : 'pending'}
              </span>
            </h2>
            {!isResult && !isExpired && (data.status === 'confirm' || data.status === 'replan') && (
              <RescheduleButton value={change} onChange={onChangeToggle}>
                <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                Reschedule
              </RescheduleButton>
            )}
          </div>
          {data.status === 'replan' && <Divider />}
          {!isExpired && data.status === 'replan' && (
            <SaveBlock style={{ justifyContent: 'space-between' }}>
              {data.isPossibleAddSchedule ? (
                <Button
                  variant={'contained'}
                  classes={classes}
                  onClick={onResult('confirm')}
                  disabled={finalMut.isLoading}
                >
                  Confirm
                </Button>
              ) : (
                <div>apply time already reserved,so need change time</div>
              )}
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
      {isResult ? (
        <MeetingResult />
      ) : (
        change && <MeetingChange place={data.location} eventId={data.eventId} meetingId={data._id} />
      )}
    </Stack>
  )
}

export default MeetingDetail
