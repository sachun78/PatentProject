import { useCallback, useEffect, useState } from 'react'
import { useCurrentEventState } from 'atoms/eventState'
import useDateTimeHook from 'hooks/useDateTimeHook'
import useInputs from 'hooks/useInputs'
import { createMeeting } from 'lib/api/meeting/createMeeting'
import DatePickerInput from 'components/DatePickerInput'
import TimePickerInput from 'components/DatePickerInput/TimePickerInput'
import Input from 'components/Input'
import LocationInput from 'components/LocationMap/LocationInput'
import RequestSection from './RequestSection'
import { toast } from 'react-toastify'
import { buttonStyle, sectionStyle, wrapper } from './styles'
import { Navigate, useNavigate } from 'react-router-dom'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useMeetingReqUser } from '../../../../atoms/meetingReqState'
import { useMutation } from 'react-query'
import { OutlinedInput } from '@mui/material'

type RequestViewProps = {}

export default function RequestForm({}: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const { startDate, endDate } = useDateRangeHook()
  const { date, time, setDate, setTime } = useDateTimeHook()
  const [meetuser, setMeetuser] = useMeetingReqUser()
  const [location, setLoaction] = useState("성수역 1번 출구")
  const navi = useNavigate()
  const [form, onChange] = useInputs({
    to: '',    
    comment: '',
    title: ''
  })

  const createScheduleMut = useMutation(createMeeting, {
    onSuccess: () => {
      toast.success('Meeting Request Success', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      navi('/membership')
    },
    onError: () => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
    }
  })

  const onChangeDate = useCallback((change: Date) => {
    if (!(change.getDate() <= endDate.getDate() && change.getDate() >= startDate.getDate())) {
      toast.error('Error Date Not Contained', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      return
    }
    change.setHours(time.getHours())
    change.setMinutes(time.getMinutes())
    setDate(change)
  }, [endDate, setDate, startDate, time])

  const onChangeTime = useCallback((change: Date) => {
    const newDate = new Date(date)
    newDate.setHours(change.getHours())
    newDate.setMinutes(change.getMinutes())
    setTime(change)
    setDate(newDate)
  }, [date, setDate, setTime])

  const onChangeLocation = useCallback((change: string) => {
    setLoaction(change)

  },[location])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const { title, to, comment } = form
    if ((!to.trim() && !meetuser) || !location.trim() || !title.trim()) {
      toast.error('Please fill out all fields', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      return
    }

    createScheduleMut.mutate({
      eventId: curEvent.id,
      title, date, time, location,
      toEmail: meetuser ? meetuser : to,      
      comment
    })
  }, [createScheduleMut, curEvent.id, date, form, meetuser, time])

  useEffect(() => {
    const tempTime = new Date(startDate)
    tempTime.setMinutes(0)
    setDate(startDate)
    setTime(tempTime)

    return () => {
      setMeetuser('')
    }
  }, [])

  if (curEvent.id === '') {
    return <Navigate to={'/membership'} />
  }

  return (
    <div css={wrapper}>
      <form css={sectionStyle} onSubmit={onSubmit}>
        <RequestSection title={'Event Info'}>
          <span>{curEvent.title}</span>
          &nbsp;
          <div> {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()} </div>
        </RequestSection>
        <RequestSection title={'Meeting Title'}>
          <OutlinedInput name='title' type={'text'} value={form.title} onChange={onChange} fullWidth />
          {/*<Input name='title' type={'text'} value={form.title} onChange={onChange} />*/}
        </RequestSection>
        <RequestSection title={'Email'}>
          {meetuser ? <span>{meetuser}</span>
            : <OutlinedInput name='to' type={'email'} value={form.to} onChange={onChange} fullWidth />
            /*<Input name='to' type={'email'} value={form.to} onChange={onChange} />*/}
        </RequestSection>
        <RequestSection title={'Meeting Date'}>
          <DatePickerInput value={date}
                           minimum={startDate}
                           maximum={endDate}
                           onChange={onChangeDate} />
        </RequestSection>
        <RequestSection title={'Meeting Time'}>
          <TimePickerInput onChange={onChangeTime} value={time} />
        </RequestSection>
        <RequestSection title={'Location'}>
          <LocationInput onChange={onChangeLocation} value={location} />
        </RequestSection>
        <RequestSection title={'Comment'}>
          <OutlinedInput placeholder='Leave a comment'
                         name='comment'
                         value={form.comment}
                         onChange={onChange}
                         multiline fullWidth
                         rows={3} />
          {/*<Input placeholder='Leave a comment'*/}
          {/*       name='comment'*/}
          {/*       value={form.comment}*/}
          {/*       onChange={onChange}*/}
          {/*       multiple={true} />*/}
        </RequestSection>
        <button css={buttonStyle} disabled={createScheduleMut.isLoading} type={'submit'}>OK</button>
      </form>
    </div>
  )
}
