import { css } from '@emotion/react'
import { useState } from 'react'
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
  const [infoVisible, setInfoVisible] = useState(false)
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
              placeholder='event'
              name='event'
              value={form.event}
              onChange={onChange}
            />
          </RequestSection>
          <RequestSection
            title={'Email'}
            button_visible
          >
            <Input
              placeholder='to'
              name='to'
              value={form.to}
              onChange={onChange}
            />
          </RequestSection>
          {infoVisible && (
            <div css={infoboxStyle}>
              Meet People Information <br />
              회사: --- <br />
              파트: --- <br />
              추가정보: ---
            </div>
          )}
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
          <RequestSection title={'Place'}>
            <Input
              placeholder='place'
              name='place'
              value={form.place}
              onChange={onChange}
            />
          </RequestSection>
          <RequestSection title={'Comment'}>
            <Input
              placeholder='comment'
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
const infoboxStyle = css`
  background: green;
`

const space = css`
  flex: 1;
`
