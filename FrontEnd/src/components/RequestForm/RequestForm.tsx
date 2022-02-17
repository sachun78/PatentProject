import { css } from '@emotion/react'
import useInputs from '../../hooks/useInputs'
import Input from '../Input'
import ViewBase from '../ViewBase'
import RequestSection from './RequestSection'
import { Button } from '@mui/material'
import DatePickerInput from '../DatePickerInput'
import TimePickerInput from '../DatePickerInput/TimePickerInput'
import useDateTimeHook from '../../hooks/useDateTimeHook'

type RequestViewProps = {
  title: string
}

export default function RequestForm({ title }: RequestViewProps) {
  const { date, time, setDate, setTime } = useDateTimeHook()
  const [form, onChange] = useInputs({
    to: '',
    event: '',
    place: '',
    comment: ''
  })

  return (
    <ViewBase title={title}>
      <div css={wrapper}>
        <div css={sectionStyle}>
          <RequestSection title={'Event'}>
            <Input
              name='event'
              value={form.event}
              onChange={onChange}
            />
          </RequestSection>
          <RequestSection
            title={'Email'}
          >
            <Input
              name='to'
              value={form.to}
              onChange={onChange}
            />
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
          <Button>
            제안하기
          </Button>
        </div>
      </div>
    </ViewBase>
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

const space = css`
  flex: 1;
`
