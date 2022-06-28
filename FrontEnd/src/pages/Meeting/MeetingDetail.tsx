import { Navigate, useNavigate, useParams } from 'react-router-dom'
import React, { useCallback, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Button, Grid, Stack } from '@mui/material'
import { ContainerBlock, InfoLink, MeetingSection, RescheduleButton, ScheduleInfoBlock } from './styles'
import MeetingResult from 'components/Schedules/MeetingResult'
import { IMeeting, User as UserType } from 'lib/api/types'
import { format, isBefore } from 'date-fns'
import { SaveBlock, useButtonStyle } from 'components/ProfileMenu/ProfileCardSave'
import { updateMeeting } from 'lib/api/meeting/updateMeeting'
import MeetingChange from 'components/Schedules/MeetingChange'
import useToggle from 'hooks/useToggle'
import IconControl from 'components/IconControl'
import patchStatusMeeting from '../../lib/api/meeting/patchStatusMeeting'

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

  const qc = useQueryClient()
  const user = qc.getQueryData<UserType>('user')
  const navi = useNavigate()
  const finalMut = useMutation(updateMeeting, {
    onSuccess: () => {
      refetch()
    },
  })

  const requestStatus = useMutation(patchStatusMeeting, {
    onSuccess: () => {
      refetch()
    },
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

  const state = useMemo(() => {
    if (!data) return ''
    let status = data?.status

    if (status === 'none' || status === 'replan' || status === 'req_replan' || status === 'req_cancel') {
      if (isBefore(new Date(data.startTime), new Date())) {
        status = 'Expired'
      } else {
        if (status === 'none') status = 'Pending'
        if (status === 'req_replan') status = 'Request replan'
        if (status === 'req_cancel') status = 'Request cancel'
      }
    }
    return status
  }, [data])

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
    <Grid container spacing={2} rowSpacing={2} width={'100%'}>
      <Grid item>
        <ContainerBlock>
          <h1>{data.title}</h1>
          <MeetingSection>
            <h2>Organizer</h2>
            <Stack direction="row" spacing={'10px'} sx={{ alignItems: 'center' }}>
              <p>{data.ownerName}</p>
              <div className={'divider'}></div>
              <p className={'email'}>{data.ownerEmail}</p>
              <InfoLink to={`/u/${data.ownerEmail}`}>
                <IconControl name={'infoUser'} style={{ marginRight: '3px' }} />
                info
              </InfoLink>
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
                <span className={'state-text'}>{state}</span>
              </h2>
              {!isResult &&
                !isExpired &&
                (data.status === 'confirm' || data.status === 'replan') &&
                data.toEmail !== user?.email && (
                  <RescheduleButton value={change} onChange={onChangeToggle}>
                    <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                    Reschedule
                  </RescheduleButton>
                )}

              {!isResult && !isExpired && data.status === 'req_replan' && data.toEmail !== user?.email && (
                <>
                  <RescheduleButton value={change} onChange={onChangeToggle}>
                    <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                    Reschedule
                  </RescheduleButton>
                  <RescheduleButton
                    value={change}
                    onClick={() => {
                      requestStatus.mutate({ status: 'cancel', meetingId: data._id })
                    }}
                  >
                    <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                    Cancel
                  </RescheduleButton>
                </>
              )}

              {!isResult && !isExpired && data.status === 'req_cancel' && data.toEmail !== user?.email && (
                <RescheduleButton
                  value={change}
                  onClick={() => {
                    requestStatus.mutate({ status: 'cancel', meetingId: data._id })
                  }}
                >
                  <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                  Cancel
                </RescheduleButton>
              )}

              {!isResult && !isExpired && data.status === 'confirm' && data.toEmail === user?.email && (
                <>
                  <RescheduleButton
                    value={change}
                    onClick={() => {
                      requestStatus.mutate({ status: 'req_replan', meetingId: data._id })
                      alert('onClick reschedule Request')
                    }}
                  >
                    <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                    Replan request
                  </RescheduleButton>
                  <RescheduleButton
                    value={change}
                    onClick={() => {
                      requestStatus.mutate({ status: 'req_cancel', meetingId: data._id })
                      alert('onClick cancel Request')
                    }}
                  >
                    <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                    Cancel request
                  </RescheduleButton>
                </>
              )}

              {!isResult && !isExpired && data.status === 'none' && data.toEmail === user?.email && (
                <>
                  <RescheduleButton
                    value={change}
                    onClick={() => {
                      navi(`/invitation/detail?code=${data.code}`)
                    }}
                  >
                    <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                    Confirm/ Cancel
                  </RescheduleButton>
                  <RescheduleButton
                    value={change}
                    onClick={() => {
                      navi(`/invitation/replan?code=${data.code}`)
                    }}
                  >
                    <IconControl name={'reschedule'} style={{ marginRight: '3px' }} />
                    Replan
                  </RescheduleButton>
                </>
              )}
            </div>

            {!change && !isExpired && data.status === 'replan' && data.toEmail !== user?.email && (
              <SaveBlock style={{ justifyContent: 'space-around' }}>
                <Button
                  variant={'contained'}
                  classes={classes}
                  onClick={onResult('cancel')}
                  disabled={finalMut.isLoading}
                  sx={{ background: '#9C9C9C ' }}
                >
                  Cancel
                </Button>
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
              </SaveBlock>
            )}
          </MeetingSection>
        </ContainerBlock>
      </Grid>
      <Grid item>
        {isResult ? (
          <MeetingResult />
        ) : (
          change && (
            <MeetingChange place={data.location} eventId={data.eventId} meetingId={data._id} onClose={onChangeToggle} />
          )
        )}
      </Grid>
    </Grid>
  )
}

export default MeetingDetail
