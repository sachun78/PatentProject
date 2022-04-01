import { css } from '@emotion/react'
import { useCallback } from 'react'
import { useCurrentEventState } from '../../atoms/eventState'
import useDateTimeHook from '../../hooks/useDateTimeHook'
import useInputs from '../../hooks/useInputs'
import { createMeeting } from '../../lib/api/meeting/createMeeting'
import palette from '../../lib/palette'
import { resetButton } from '../../lib/styles/resetButton'
import DatePickerInput from '../DatePickerInput'
import TimePickerInput from '../DatePickerInput/TimePickerInput'
import Input from '../Input'
import LocationInput from '../LocationMap/LocationInput'
import RequestSection from './RequestSection'
import { toast } from 'react-toastify'

type RequestViewProps = {}

export default function RequestForm({}: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const { date, time, setDate, setTime } = useDateTimeHook()

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
    }).catch(e => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
    })
  }, [curEvent, date, form, time])

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
            setDate(value)
          }} />
        </RequestSection>
        <RequestSection title={'Meeting Time'}>
          <TimePickerInput onChange={(value: Date) => {
            setTime(value)
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

const wrapper = css`
  max-width: 90rem;
  height: 100%;
`
const sectionStyle = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;

  .ant-btn {
    height: 2.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .ant-picker {
    flex-grow: 1;
  }
`

const buttonStyle = css`
  ${resetButton};
  height: 2.8rem;
  color: white;
  background: ${palette.cyan[500]};
  max-width: 60rem;

  &:hover,
  &:focus-visible {
    background: ${palette.cyan[400]};
  }

  border-radius: 0.8rem;
  margin-left: 1rem;
`

const space = css`
  flex: 1;
`
const headerStyle = css`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
`
