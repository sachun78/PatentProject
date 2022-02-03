import { css } from '@emotion/react'
import moment from 'moment'
import { useState } from 'react'
import { useDateState } from '../../atoms/dateState'
import useInputs from '../../hooks/useInputs'
import Input from '../Input'
import ViewBase from '../ViewBase'
import RequestSection from './RequestSection'
import { proposalInput, subUser } from '../../lib/api/meeting/proposal'
import { Button } from '@mui/material'

type RequestViewProps = {
  title: string
}

export default function RequestForm({ title }: RequestViewProps) {
  const [timeDatevalue, setTimeDateValue] = useDateState()
  const [infoVisible, setInfoVisible] = useState(false)
  const [form, onChange] = useInputs({
    username: '',
    event: '',
    place: '',
    comment: ''
  })
  const format = 'HH:mm'

  const handleProposal = async () => {
    const guests: subUser[] = []
    guests.push({
      name: form.username,
      company: '',
      email: form.username,
      tel: '',
      member: true
    })
    const input: proposalInput = {
      email: 'ryan4321@naver.com', //TODO: TEMPORARY DATA, EMAIL value NEED Change accoding to USER
      event: form.event,
      date: moment(timeDatevalue.date).format('YYYY-MM-DD'),
      time: moment(timeDatevalue.time).format(format),
      location: form.place,
      guests: guests,
      comment: form.comment
    }
  }

  return (
    <ViewBase title={title}>
      <div css={wrapper}>
        <div css={sectionStyle}>
          <RequestSection title={'이벤트'}>
            <Input
              placeholder='event'
              name='event'
              value={form.event}
              onChange={onChange}
            />
          </RequestSection>
          <RequestSection
            title={'사용자 이름'}
            button_visible
          >
            <Input
              placeholder='username'
              name='username'
              value={form.username}
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
          <RequestSection title={'날짜'}>
            DatePicker
          </RequestSection>
          <RequestSection title={'시간'}>
            시간선택기
          </RequestSection>
          <RequestSection title={'미팅장소'}>
            <Input
              placeholder='place'
              name='place'
              value={form.place}
              onChange={onChange}
            />
          </RequestSection>
          <RequestSection title={'코멘트'}>
            <Input
              placeholder='comment'
              name='comment'
              value={form.comment}
              onChange={onChange}
            />
          </RequestSection>
          <div css={space}></div>
          <Button onClick={handleProposal}>
            제안하기
          </Button>
        </div>
        <div css={previewStyle(true)}>미리보기</div>
      </div>
    </ViewBase>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: row;
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

const previewStyle = (visible: boolean) => css`
  ${!visible &&
  css`
    display: none;
  `}
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: red;
`
const space = css`
  flex: 1;
`
