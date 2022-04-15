import { useCallback, useEffect } from 'react'
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
import { buttonStyle, headerStyle, sectionStyle, wrapper } from './styles'
import { Navigate, useNavigate } from 'react-router-dom'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useMeetingReqUser } from '../../../../atoms/meetingReqState'

type RequestViewProps = {}

export default function RequestForm({}: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const { startDate, endDate } = useDateRangeHook()
  const { date, time, setDate, setTime } = useDateTimeHook()
  const [meetuser, setMeetuser] = useMeetingReqUser()
  const navi = useNavigate()
  const [form, onChange] = useInputs({
    to: '',
    place: '성수역1번출구',
    comment: '',
    title: ''
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

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const { title, to, place, comment } = form
    if ((!to.trim() && !meetuser) || !place.trim() || !title.trim()) {
      toast.error('Please fill out all fields', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      return
    }

    createMeeting({
      eventId: curEvent.id,
      title, date, time,
      toEmail: meetuser ? meetuser : to,
      location: place,
      comment
    }).then(() => {
      toast.success('Meeting Request Success', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      navi('/membership')
    }).catch(e => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
    })
  }, [curEvent.id, date, form, meetuser, navi, time])

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
      <div css={headerStyle}> Request Meeting</div>
      <form css={sectionStyle} onSubmit={onSubmit}>
        <RequestSection title={'Event Info'}>
          <span>{curEvent.title}</span>
          &nbsp;
          <div> {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()} </div>
        </RequestSection>
        <RequestSection title={'Meeting Title'}>
          <Input name='title' type={'text'} value={form.title} onChange={onChange} />
        </RequestSection>
        <RequestSection title={'Email'}>
          {meetuser ? <span>{meetuser}</span>
            : <Input name='to' type={'email'} value={form.to} onChange={onChange} />}
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
          <LocationInput />
        </RequestSection>
        <RequestSection title={'Comment'}>
          <Input placeholder='Leave a comment'
                 name='comment'
                 value={form.comment}
                 onChange={onChange} />
        </RequestSection>
        <button css={buttonStyle} type={'submit'}>OK</button>
      </form>
    </div>
  )
}
