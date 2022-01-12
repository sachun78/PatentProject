import { css } from '@emotion/react'
import { Button, TimePicker } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useDateState } from '../../atoms/dateState'
import useInputs from '../../hooks/useInputs'
import DatePickerInput from '../DatePicker/DatePickerInput'
import Input from '../Input'
import ViewBase from '../ViewBase'
import RequestSection from './RequestSection'

type RequestViewProps = {
  title: string
}

export default function RequestView({ title }: RequestViewProps) {
  const [value, setValue] = useDateState()
  const [infoVisible, setInfoVisible] = useState(false)
  const [form, onChange] = useInputs({
    username: '',
    event: '',
    place: '',
    comment: '',
  })

  const handleSearch = () => {
    setInfoVisible(!infoVisible)
  }

  const handleChangeDate = (date: moment.Moment) => {
    setValue({ date })
  }

  const format = 'HH:mm'

  return (
    <ViewBase title={title}>
      <div css={wrapper}>
        <div css={sectionStyle}>
          <RequestSection title={'이벤트'}>
            <Input placeholder="event" />
          </RequestSection>
          <RequestSection
            title={'사용자 이름'}
            button_visible
            onClick={handleSearch}
          >
            <Input
              placeholder="username"
              name="username"
              value={form.username}
              onChange={onChange}
            />
          </RequestSection>
          {infoVisible && (
            <div css={infoboxStyle}>
              인포박스 <br />
              회사: --- <br />
              파트: --- <br />
              추가정보: ---
            </div>
          )}
          <RequestSection title={'날짜'}>
            <DatePickerInput value={value.date} onChange={handleChangeDate} />
          </RequestSection>
          <RequestSection title={'시간'}>
            <TimePicker
              defaultValue={moment('12:08', format)}
              format={format}
              minuteStep={10}
            />
          </RequestSection>
          <RequestSection title={'미팅장소'}>
            <Input
              placeholder="place"
              name="place"
              value={form.place}
              onChange={onChange}
            />
          </RequestSection>
          <RequestSection title={'코멘트'}>
            <Input
              placeholder="comment"
              name="comment"
              value={form.comment}
              onChange={onChange}
            />
          </RequestSection>
          <div css={space}></div>
          <Button type="primary">제안하기</Button>
        </div>
        <div css={previewStyle(true)}>미리보기</div>
      </div>
    </ViewBase>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: row;
  height: 86vh;
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
    width: 600px;
  }
`
const infoboxStyle = css`
  background: green;
`

const previewStyle = (visible: boolean) => css`
  ${!visible &&
  css`
    display: none;
  `}
  flex:1;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: red;
`
const space = css`
  flex: 1;
`
