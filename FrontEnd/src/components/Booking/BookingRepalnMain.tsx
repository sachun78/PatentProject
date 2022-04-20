import { mainStyle } from './styles'
import { IMeeting } from '../../lib/api/types'
import useInput from 'hooks/useInput'
import RequestSection from '../../pages/Meeting/meeting-create-form/RequestForm/RequestSection'
import DatePickerInput from '../DatePickerInput'
import TimePickerInput from '../DatePickerInput/TimePickerInput'
import Input from '../Input/Input'
import LocationInput from '../LocationMap/LocationInput'
import { Button, Typography } from '@mui/material'
import React, { ChangeEvent, useCallback } from 'react'
import { replanMeeting } from '../../lib/api/meeting/replanMeeting'
import { useQueryClient } from 'react-query'

export type BookingRepalnMainProps = {
  meeting: IMeeting
}

function BookingRepalnMain({ meeting }: BookingRepalnMainProps) {
  const [location, ,onChangeLocation] = useInput(meeting.location)
  const [date, , setDate] = useInput(new Date(meeting.date))
  const [time, , setTime] = useInput(new Date(meeting.time))
  const [comment, onChangeComment] = useInput('')
  const qc = useQueryClient()

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    console.log(location, date, time, comment)
    replanMeeting(meeting.code, { location, date, time, comment })
      .then(() => {
        console.log('success')
        qc.invalidateQueries(['meeting', meeting.code])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [location, date, time, comment, meeting.code])

  if (meeting.status !== 'none') {
    return (
      <div css={mainStyle}>
        <Typography variant='h5'>
          Replan Completed
        </Typography>
      </div>
    )
  }

  return <div css={mainStyle}>
    <Typography component='h6' variant='h3' align={'center'}> Replan</Typography>
    <form onSubmit={onSubmit}>
      <RequestSection title={'Meeting Date'}>
        <DatePickerInput value={date} onChange={(value: Date) => {
          console.log(time)
          value.setHours(time.getHours())
          value.setMinutes(time.getMinutes())
          setDate(value)
        }} />
      </RequestSection>
      <RequestSection title={'Meeting Time'}>
        <TimePickerInput onChange={(value: Date) => {
          setTime(value)
          setDate(prev => {
            const newDate = new Date(prev)
            newDate.setHours(value.getHours())
            newDate.setMinutes(value.getMinutes())
            console.log(newDate)
            return newDate
          })
        }} value={time} />
      </RequestSection>
      <RequestSection title={'Location'}>
        <LocationInput onChange={(value: any) => {
            console.log(value)
            onChangeLocation(value)
        }} value={location} />
      </RequestSection>
      <RequestSection title={'Comment'}>
        <Input
          placeholder='Leave a comment'
          name='comment'
          value={comment}
          onChange={onChangeComment}
        />
      </RequestSection>
      <Button variant={'contained'} type={'submit'}>Submit </Button>
    </form>
  </div>
}

export default BookingRepalnMain
