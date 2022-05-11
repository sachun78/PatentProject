import { mainStyle } from './styles'
import { IReplan } from '../../lib/api/types'
import useInput from 'hooks/useInput'
import RequestSection from 'pages/Meeting/meeting-create-form/RequestForm/RequestSection'
import { Button, OutlinedInput, Typography } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { replanMeeting } from '../../lib/api/meeting/replanMeeting'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import TimeGridInput from '../DatePickerInput/TimeGridInput'

export type BookingRepalnMainProps = {
  meeting: IReplan
}

export default function BookingRepalnMain({ meeting }: BookingRepalnMainProps) {
  const [location] = useInput(meeting.data.location)
  const [date, , setDate] = useInput(new Date(meeting.data.date))
  const [startTime, , setStartTime] = useInput(new Date(meeting.data.startTime))
  const [endTime, , setEndTime] = useInput(new Date(meeting.data.endTime))
  const [comment, onChangeComment] = useInput('')
  const eventStart = useMemo(() => new Date(meeting.sendData.event_startDate), [meeting.sendData.event_startDate])
  const eventEnd = useMemo(() => new Date(meeting.sendData.event_endDate), [meeting.sendData.event_endDate])

  const qc = useQueryClient()
  const replanMut = useMutation(replanMeeting, {
    onSuccess: () => {
      qc.invalidateQueries(['meeting', meeting.data.code])
    },
    onError: (err) => {
      console.error(err)
    },
  })

  const onTimeChange = useCallback(
    (start: Date, end: Date) => {
      setStartTime(start)
      setEndTime(end)
    },
    [setStartTime, setEndTime]
  )
  const onDateChange = useCallback(
    (date: Date) => {
      setDate(date)
    },
    [setDate]
  )
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      if (!comment) {
        return
      }

      replanMut.mutate({
        code: meeting.data.code,
        data: {
          location: meeting.data.location,
          date,
          startTime,
          endTime,
          comment,
        },
      })
    },
    [comment, replanMut, meeting.data.code, meeting.data.location, date, startTime, endTime]
  )

  if (meeting.data.status !== 'none') {
    const isReplan = meeting.data.status === 'replan'
    return (
      <div css={mainStyle}>
        <Typography variant="h5">
          {isReplan ? 'Rescheduling has been completed.' : 'Already Confirm or Cancel!!'}
        </Typography>
        <Link to={'/'} style={{ textAlign: 'center', marginTop: '1rem' }}>
          Back
        </Link>
      </div>
    )
  }

  return (
    <div css={mainStyle}>
      <h3>Replan</h3>
      <form onSubmit={onSubmit}>
        <RequestSection title={'Change Date'}>
          <TimeGridInput
            startTime={startTime}
            endTime={endTime}
            date={date}
            startDate={eventStart}
            endDate={eventEnd}
            timeChange={onTimeChange}
            timeEvent={meeting.sendData.meeting_timeList}
            dateChange={onDateChange}
          />
        </RequestSection>
        {/*<RequestSection title={'Location'}>{location}</RequestSection>*/}
        <RequestSection title={'Comment'}>
          <OutlinedInput
            placeholder="Leave a comment"
            name="comment"
            fullWidth
            value={comment}
            onChange={onChangeComment}
            minRows={3}
            multiline
          />
        </RequestSection>
        <Button variant={'contained'} type={'submit'} fullWidth>
          Submit
        </Button>
      </form>
    </div>
  )
}
