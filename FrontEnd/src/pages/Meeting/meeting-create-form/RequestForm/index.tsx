import { useCallback, useEffect, useState } from 'react'
import { useCurrentEventState } from 'atoms/eventState'
import useDateTimeHook from 'hooks/useDateTimeHook'
import useInputs from 'hooks/useInputs'
import { createMeeting } from 'lib/api/meeting/createMeeting'
import DatePickerInput from 'components/DatePickerInput'
import TimePickerInput from 'components/DatePickerInput/TimePickerInput'
import LocationInput from 'components/LocationMap/LocationInput'
import RequestSection from './RequestSection'
import { toast } from 'react-toastify'
import { buttonStyle, sectionStyle } from './styles'
import { Navigate, useNavigate } from 'react-router-dom'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useMeetingReqUser } from 'atoms/meetingReqState'
import { useMutation } from 'react-query'
import { OutlinedInput } from '@mui/material'
import { ContainerBlock } from 'pages/Meeting/styles'

type RequestViewProps = {}

export default function RequestForm({}: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const { startDate, endDate } = useDateRangeHook()
  const { date, time, setDate, setTime } = useDateTimeHook()
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [meetuser, setMeetuser] = useMeetingReqUser()
  const [location, setLoaction] = useState('성수역 1번 출구')
  const navi = useNavigate()
  const [form, onChange] = useInputs({
    to: '',
    comment: '',
    title: '',
  })

  const createScheduleMut = useMutation(createMeeting, {
    onSuccess: () => {
      toast.success('Meeting Request Success', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
      navi('/meeting')
    },
    onError: () => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
    },
  })

  const onChangeDate = useCallback(
    (change: Date) => {
      if (
        !(
          change.getDate() <= endDate.getDate() &&
          change.getDate() >= startDate.getDate()
        )
      ) {
        toast.error('Error Date Not Contained', {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 3000,
        })
        return
      }
      if (time) {
        change.setHours(time.getHours())
        change.setMinutes(time.getMinutes())
      }
      setDate(change)
    },
    [endDate, setDate, startDate, time]
  )

  const onChangeTime = useCallback(
    (change: Date) => {
      const newDate = new Date(date)
      newDate.setHours(change.getHours())
      newDate.setMinutes(change.getMinutes())
      setTime(change)
      setDate(newDate)
    },
    [date, setDate, setTime]
  )

  const onChangeEndTime = useCallback((change: Date) => {
    setEndTime(change)
  }, [])

  const onChangeLocation = useCallback(
    (change: string) => {
      setLoaction(change)
    },
    [location]
  )

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const { title, to, comment } = form
      if (
        (!to.trim() && !meetuser) ||
        !location.trim() ||
        !title.trim() ||
        !time
      ) {
        toast.error('Please fill out all fields', {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 3000,
        })
        return
      }

      createScheduleMut.mutate({
        eventId: curEvent.id,
        title,
        date,
        time,
        location,
        toEmail: meetuser ? meetuser : to,
        comment,
      })
    },
    [createScheduleMut, curEvent.id, date, form, meetuser, time]
  )

  useEffect(() => {
    setDate(startDate)
    setTime(null)

    return () => {
      setMeetuser('')
    }
  }, [])

  if (curEvent.id === '') {
    return <Navigate to={'/meeting'} />
  }

  return (
    <ContainerBlock>
      <form css={sectionStyle} onSubmit={onSubmit}>
        <RequestSection title={curEvent.title}>
          <span>
            {' '}
            {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
          </span>
        </RequestSection>
        <RequestSection title={'Meeting Title'}>
          <OutlinedInput
            name="title"
            type={'text'}
            value={form.title}
            onChange={onChange}
            fullWidth
            style={{ height: '38px', backgroundColor: '#fff' }}
          />
        </RequestSection>
        <RequestSection title={'Email'}>
          {meetuser ? (
            <span>{meetuser}</span>
          ) : (
            <OutlinedInput
              name="to"
              type={'email'}
              value={form.to}
              onChange={onChange}
              fullWidth
              style={{ height: '38px', backgroundColor: '#fff' }}
            />
          )}
        </RequestSection>
        <RequestSection title={'Meeting Date'}>
          <DatePickerInput
            value={date}
            minimum={startDate}
            maximum={endDate}
            onChange={onChangeDate}
          />
        </RequestSection>
        <RequestSection title={'Meeting Time (a half-hour unit)'}>
          <TimePickerInput onChange={onChangeTime} value={time} />
          <span style={{ margin: '0 1rem', fontSize: '1.25rem' }}>~</span>
          <TimePickerInput onChange={onChangeEndTime} value={endTime} />
        </RequestSection>
        <RequestSection title={'Location'}>
          <LocationInput onChange={onChangeLocation} value={location} />
        </RequestSection>
        <RequestSection title={'Comment'}>
          <OutlinedInput
            placeholder="Leave a message"
            name="comment"
            value={form.comment}
            onChange={onChange}
            multiline
            fullWidth
            minRows={3}
            style={{ backgroundColor: '#fff' }}
          />
        </RequestSection>
        <button
          css={buttonStyle}
          disabled={createScheduleMut.isLoading}
          type={'submit'}
        >
          PROPOSE MEETING
        </button>
      </form>
    </ContainerBlock>
  )
}
