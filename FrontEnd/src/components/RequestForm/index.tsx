import { useCallback } from 'react'
import { useCurrentEventState } from 'atoms/eventState'
import useDateTimeHook from 'hooks/useDateTimeHook'
import useInputs from 'hooks/useInputs'
import { createMeeting } from 'lib/api/meeting/createMeeting'
import DatePickerInput from '../DatePickerInput'
import TimePickerInput from '../DatePickerInput/TimePickerInput'
import Input from '../Input'
import LocationInput from '../LocationMap/LocationInput'
import RequestSection from './RequestSection'
import { toast } from 'react-toastify'
import { buttonStyle, headerStyle, sectionStyle, space, wrapper } from './styles'
import { Navigate, useNavigate } from 'react-router-dom'

type RequestViewProps = {}

export default function RequestForm({}: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const { date, time, setDate, setTime } = useDateTimeHook()
  const navi = useNavigate()
  const [form, onChange] = useInputs({
    to: '',
    place: '1234',
    comment: '',
    title: ''
  })

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
  if (curEvent.id === '') {
    return <Navigate to={'/membership'} />
  }
  return (
    <div css={wrapper}>
      <div css={headerStyle}> Request Meeting</div>
      <div css={sectionStyle}>
        <RequestSection title={'Event'}>
          <span>{curEvent.title}</span>
        </RequestSection>
        <RequestSection title={'Meeting Title'}>
          <Input name='title' value={form.title} onChange={onChange} />
        </RequestSection>
        <RequestSection title={'Email'}>
          <Input name='to' value={form.to} onChange={onChange} />
        </RequestSection>
        <RequestSection title={'Meeting Date'}>
          <DatePickerInput value={date} onChange={(value: Date) => {
            value.setHours(time.getHours())
            value.setMinutes(time.getMinutes())
            setDate(value)
          }} />
        </RequestSection>
        <RequestSection title={'Meeting Time'}>
          <TimePickerInput onChange={(value: Date) => {
            const newDate = new Date(date)
            newDate.setHours(value.getHours())
            newDate.setMinutes(value.getMinutes())
            setTime(value)
            setDate(newDate)
          }} value={time} />
        </RequestSection>``
        <RequestSection title={'Location'}>
          <LocationInput />
        </RequestSection>
        <RequestSection title={'Comment'}>
          <Input
            placeholder='Leave a comment'
            name='comment'
            value={form.comment}
            onChange={onChange}
          />
        </RequestSection>
        <div css={space} />
        <button css={buttonStyle} onClick={onSubmit}>OK</button>
      </div>
    </div>
  )
}
