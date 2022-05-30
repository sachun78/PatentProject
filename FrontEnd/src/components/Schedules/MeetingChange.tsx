import { ContainerBlock } from 'pages/Meeting/styles'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, OutlinedInput } from '@mui/material'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'
import useInput from 'hooks/useInput'
import RequestSection from 'pages/Meeting/meeting-create-form/RequestForm/RequestSection'
import TimeGridInput from '../DatePickerInput/TimeGridInput'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getEvent } from 'lib/api/event/getEvent'
import useDateTimeHook from 'hooks/useDateTimeHook'
import { IMeeting } from 'lib/api/types'
import { changeMeeting } from 'lib/api/meeting/updateMeeting'
import { submitButton } from 'lib/styles/submitButton'
import { toast } from 'react-toastify'

export type MeetingChangeProps = {
  place: string
  eventId: string
  meetingId: string
  onClose: () => void
}

function MeetingChange({ place, eventId, meetingId, onClose }: MeetingChangeProps) {
  const [replace, setReplace] = useInput(place)
  const [comment, onChangeComment] = useInput('')
  const classes = useRemoveOutlineHover()
  const qc = useQueryClient()
  const { data: event, isLoading } = useQuery(['event', eventId], getEvent, {
    enabled: !!eventId,
    retry: false,
  })

  const { date, time, setDate, setTime } = useDateTimeHook()
  const [endTime, setEndTime] = useState<Date | null>(null)

  const onChangeMeeting = useMutation(changeMeeting, {
    onSuccess: () => {
      onClose()
      qc.invalidateQueries(['meeting', meetingId])
    },
  })

  const onChangeDate = useCallback(
    (change: Date) => {
      setDate(change)
    },
    [setDate]
  )

  const onChangeTime = useCallback(
    (change: Date) => {
      setTime(change)
    },
    [setTime]
  )

  const onChangeEndTime = useCallback((change: Date) => {
    setEndTime(change)
  }, [])

  const filteredTimeEvent = useMemo(() => {
    if (!event) return []
    return (event.meeting_list as IMeeting[])
      .filter((meeting: IMeeting) => {
        return meeting._id !== meetingId
      })
      .filter((meeting: IMeeting) => {
        return meeting.status === 'confirm'
      })
  }, [event, meetingId])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!endTime) {
        return toast('please select changed meeting time', { pauseOnHover: false })
      }
      if (!comment.trim()) {
        return
      }
      onChangeMeeting.mutate({ meetingId, location: replace, comment, startTime: time, endTime })
    },
    [comment, endTime, meetingId, onChangeMeeting, replace, time]
  )

  const buttonStyle = submitButton()

  if (!event || isLoading) return null

  return (
    <ContainerBlock>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <RequestSection title={'TimeSelect'}>
          <TimeGridInput
            startTime={time}
            endTime={endTime}
            date={date}
            startDate={event.start_date}
            endDate={event.end_date}
            timeChange={(sDate: Date, eDate: Date) => {
              onChangeTime(sDate)
              onChangeEndTime(eDate)
            }}
            timeEvent={filteredTimeEvent}
            dateChange={onChangeDate}
            unavailables={event.restricted_time}
          />
        </RequestSection>

        <RequestSection title={'Place'}>
          <OutlinedInput
            type={'text'}
            value={replace}
            onChange={setReplace}
            placeholder={'Enter new Place'}
            classes={classes}
            sx={{ height: 38 }}
            fullWidth
          />
        </RequestSection>
        <RequestSection title={'Comment'}>
          <OutlinedInput
            type={'text'}
            value={comment}
            onChange={onChangeComment}
            placeholder={'Enter a new Comment'}
            classes={classes}
            multiline
            fullWidth
          />
        </RequestSection>
        <Button type={'submit'} variant={'contained'} classes={buttonStyle} disabled={onChangeMeeting.isLoading}>
          Submit
        </Button>
      </form>
    </ContainerBlock>
  )
}

export default MeetingChange
