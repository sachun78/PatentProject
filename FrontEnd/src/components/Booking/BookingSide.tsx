import { css } from '@emotion/react'
import { IMeeting } from 'lib/api/types'
import styled from '@emotion/styled'
import { Avatar, OutlinedInput } from '@mui/material'
import { format } from 'date-fns'
import { API_PATH } from 'lib/api/client'
import gravatar from 'gravatar'
import React from 'react'
import IconControl from '../IconControl'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'

export type BookingSideProps = {
  meeting: IMeeting
}

function BookingSide({ meeting }: BookingSideProps) {
  const classes = useRemoveOutlineHover()

  return (
    <div css={sideStyle}>
      <section css={sectionStyle}>
        <h3 css={sectionTitle}>/ Offer from /</h3>
        <Avatar
          alt={meeting.ownerEmail}
          src={`${API_PATH}static/${meeting.ownerEmail}`}
          sx={{ width: 60, height: 60, marginBottom: '20px' }}
          style={{ border: '1px solid lightgray' }}
          imgProps={{ crossOrigin: 'anonymous' }}
        >
          <img src={gravatar.url(meeting.ownerEmail, { s: '60px', d: 'retro' })} alt={'fallback'} />
        </Avatar>
        <div css={nameStyle}>{meeting.ownerName}</div>
        <IconTextBlock>
          <IconControl name={'company'} /> {meeting.ownerCompany ?? 'company is not provided'}
        </IconTextBlock>
        <IconTextBlock>
          <IconControl name={'phone'} /> {meeting.ownerPhone ?? 'phone is not provided'}
        </IconTextBlock>
        <IconTextBlock>
          <IconControl name={'email'} />
          {meeting.ownerEmail}
        </IconTextBlock>
      </section>
      <section css={sectionStyle}>
        <h3 css={sectionTitle}>/ Info /</h3>
        <h1 css={eventNameStyle}>{meeting.title}</h1>
        <IconTextBlock>
          <IconControl name={'date'} /> {format(new Date(meeting.date), 'EEEE, d MMM, yyyy')}
        </IconTextBlock>
        <IconTextBlock>
          <IconControl name={'time'} />
          {format(new Date(meeting.startTime), 'HH:mm') + ' - ' + format(new Date(meeting.endTime), 'HH:mm')}
        </IconTextBlock>
        <IconTextBlock>
          <IconControl name={'place'} />
          {meeting.location}
        </IconTextBlock>
        <CommentSection>
          <IconTextBlock>
            <IconControl name={'comment'} />
            Comment
          </IconTextBlock>
          <OutlinedInput
            value={meeting.comment}
            fullWidth
            rows={3}
            multiline
            classes={classes}
            inputProps={{
              style: {
                color: '#6c6c6c',
                font: 'normal normal normal 16px/26px NanumSquareOTF',
              },
            }}
          />
        </CommentSection>
      </section>
    </div>
  )
}

const sideStyle = css`
  display: flex;
  transition: all 0.22s ease-out;
  padding: 30px;
  box-shadow: 2px 5px 11px #00000029;
  border-radius: 1rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`
const nameStyle = css`
  margin: 0 0 20px;
  color: #333333;
  font: normal normal 800 18px/21px NanumSquareOTF;
  line-height: 1.166666667;
`

const eventNameStyle = css`
  margin: 0 0 20px;
  font: normal normal 800 18px/21px NanumSquareOTF;
  color: #333333;
`

export const sectionTitle = css`
  font: normal normal 800 12px/13px NanumSquareOTF;
  color: #910457;
  margin-bottom: 1.25rem;
`
const sectionStyle = css`
  flex: 1;
`

const IconTextBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #6c6c6c;
  font: normal normal normal 16px/26px NanumSquareOTF;

  svg {
    margin-right: 6px;
  }
`
const CommentSection = styled.section`
  margin-top: 20px;
`

export default BookingSide
