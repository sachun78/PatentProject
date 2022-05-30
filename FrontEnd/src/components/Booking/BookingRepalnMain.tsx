import { mainStyle } from './styles'
import { IReplan } from 'lib/api/types'
import useInput from 'hooks/useInput'
import RequestSection from 'pages/Meeting/meeting-create-form/RequestForm/RequestSection'
import { Button, OutlinedInput, Typography } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { replanMeeting } from 'lib/api/meeting/replanMeeting'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import TimeGridInput from '../DatePickerInput/TimeGridInput'
import { isBefore } from 'date-fns'
import { sectionTitle } from './BookingSide'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'
import { submitButton } from 'lib/styles/submitButton'

export type BookingRepalnMainProps = {
  meeting: IReplan
}

export default function BookingRepalnMain({ meeting }: BookingRepalnMainProps) {
  const [location, onChangeLocation] = useInput(meeting.data.location)
  const [date, , setDate] = useInput(new Date(meeting.data.date))
  const [startTime, , setStartTime] = useInput<Date | null>(null)
  const [endTime, , setEndTime] = useInput<Date | null>(null)
  const [comment, onChangeComment] = useInput('')
  const eventStart = useMemo(() => new Date(meeting.sendData.event_startDate), [meeting.sendData.event_startDate])
  const eventEnd = useMemo(() => new Date(meeting.sendData.event_endDate), [meeting.sendData.event_endDate])

  const isExpired = useMemo(() => isBefore(new Date(meeting.data.startTime), new Date()), [meeting.data.startTime])
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

      if (!comment || !startTime || !endTime) {
        alert('All fields are required')
        return
      }

      replanMut.mutate({
        code: meeting.data.code,
        data: {
          location,
          date,
          startTime,
          endTime,
          comment,
        },
      })
    },
    [comment, startTime, endTime, replanMut, meeting.data.code, location, date]
  )

  const classes = useRemoveOutlineHover()
  const buttonClass = submitButton()
  if (meeting.data.status !== 'none') {
    const isReplan = meeting.data.status === 'replan'
    return (
      <div css={mainStyle} style={{ textAlign: 'center' }}>
        {isReplan ? 'Rescheduling request success.' : 'Already select Confirm or Cancel'}
        <Link to={'/'} style={{ textAlign: 'center', marginTop: '1rem' }}>
          Back
        </Link>
      </div>
    )
  }

  if (isExpired) {
    return (
      <div css={mainStyle}>
        <Typography variant="h5">Expired Meeting</Typography>
        <Link to={'/'} style={{ textAlign: 'center', marginTop: '1rem' }}>
          Back
        </Link>
      </div>
    )
  }

  return (
    <div css={mainStyle}>
      <h3 css={sectionTitle}>/ Replan /</h3>
      <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <RequestSection title={'Change Date'} icon={'date'}>
          <TimeGridInput
            startTime={startTime}
            endTime={endTime}
            date={date}
            startDate={eventStart}
            endDate={eventEnd}
            timeChange={onTimeChange}
            timeEvent={meeting.sendData.meeting_timeList}
            dateChange={onDateChange}
            unavailables={meeting.sendData.event_restritedTime}
          />
        </RequestSection>
        <RequestSection title={'Change Location'} icon={'place'}>
          <OutlinedInput
            name="location"
            fullWidth
            value={location}
            onChange={onChangeLocation}
            classes={classes}
            style={{ height: '38px' }}
            inputProps={{
              style: {
                color: '#6c6c6c',
                font: 'normal normal normal 16px/26px NanumSquareOTF',
              },
            }}
          />
        </RequestSection>
        <RequestSection title={'Comment'} icon={'comment'}>
          <OutlinedInput
            placeholder="Leave a comment"
            name="comment"
            fullWidth
            value={comment}
            onChange={onChangeComment}
            minRows={3}
            multiline
            classes={classes}
            inputProps={{
              style: {
                color: '#6c6c6c',
                font: 'normal normal normal 16px/26px NanumSquareOTF',
              },
            }}
          />
        </RequestSection>
        <Button variant={'contained'} type={'submit'} disabled={replanMut.isLoading} classes={buttonClass}>
          Submit
        </Button>
      </form>
    </div>
  )
}
