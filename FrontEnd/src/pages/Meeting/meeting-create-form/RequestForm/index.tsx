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

type RequestViewProps = {}

export default function RequestForm({}: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const { startDate, endDate } = useDateRangeHook()
  const { date, time, setDate, setTime } = useDateTimeHook()
  const navi = useNavigate()
  const [form, onChange] = useInputs({
    to: '',
    place: '1234',
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

  const onSubmit = useCallback(() => {
    console.log(form, date.toLocaleDateString(), time.toLocaleTimeString(), curEvent)
    const { title, to, place, comment } = form
    if (!to || !to.trim() || !place || !place.trim() || !title || !title.trim()) {
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
      toEmail: to, location: place,
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
  }, [curEvent, date, form, time])

  useEffect(() => {
    const tempTime = new Date(startDate)
    tempTime.setMinutes(0)
    setDate(startDate)
    setTime(tempTime)
  }, [])

  if (curEvent.id === '') {
    return <Navigate to={'/membership'} />
  }

  return (
    <div css={wrapper}>
      <div css={headerStyle}> Request Meeting</div>
      <div css={sectionStyle}>
        <RequestSection title={'Event Info'}>
          <span>{curEvent.title}</span>
          &nbsp;
          <div> {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}</div>
        </RequestSection>
        <RequestSection title={'Meeting Title'}>
          <Input name='title' value={form.title} onChange={onChange} />
        </RequestSection>
        <RequestSection title={'Email'}>
          <Input name='to' value={form.to} onChange={onChange} />
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
        <button css={buttonStyle} onClick={onSubmit}>OK</button>
      </div>
    </div>
  )
}
