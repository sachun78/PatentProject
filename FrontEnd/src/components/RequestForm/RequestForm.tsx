import { css } from '@emotion/react'
import useInputs from '../../hooks/useInputs'
import Input from '../Input'
import RequestSection from './RequestSection'
import DatePickerInput from '../DatePickerInput'
import TimePickerInput from '../DatePickerInput/TimePickerInput'
import useDateTimeHook from '../../hooks/useDateTimeHook'
import { useCurrentEventState } from '../../atoms/eventState'
import { resetButton } from '../../lib/styles/resetButton'
import palette from '../../lib/palette'
import { createMeeting } from '../../lib/api/meeting/createMeeting'

type RequestViewProps = {
  title: string
}

export default function RequestForm({ title }: RequestViewProps) {
  const [curEvent] = useCurrentEventState()
  const { date, time, setDate, setTime } = useDateTimeHook()

  const [form, onChange] = useInputs({
    to: '',
    place: '',
    comment: '',
    title: ''
  })

  const onSubmit = async () => {
    console.log(form, date.toLocaleDateString(), time.toLocaleTimeString(), curEvent)
    const { title, to, place, comment } = form
    if (!to || !place || !title) {
      alert('모든 항목을 입력해주세요.')
      return
    }

    try {
      await createMeeting({
        title,
        date,
        time,
        toEmail: to,
        location: place,
        comment,
        eventId: curEvent.id
      })
    } catch (e) {
      console.error()
    }
  }

  return (
    <div css={wrapper}>
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
        </RequestSection>
        <RequestSection title={'Location'}>
          <Input
            placeholder='Add a location'
            name='place'
            value={form.place}
            onChange={onChange}
          />
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
