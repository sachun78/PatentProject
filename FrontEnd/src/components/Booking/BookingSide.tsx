import { css } from '@emotion/react'
import { BsCalendarDate, BsClock } from 'react-icons/bs'
import { MdEmail, MdOutlineLocationOn, MdSimCard } from 'react-icons/md'
import { IMeeting } from 'lib/api/types'
import styled from '@emotion/styled'
import { OutlinedInput } from '@mui/material'
import media from '../../lib/styles/media'
import { format } from 'date-fns'

export type BookingSideProps = {
  meeting: IMeeting
}

function BookingSide({ meeting }: BookingSideProps) {
  return (
    <div css={sideStyle}>
      <section css={sectionStyle}>
        <span css={nameStyle}>{meeting.ownerName}</span>
        <h1 css={eventNameStyle}>{meeting.title}</h1>
      </section>
      <section css={sectionStyle}>
        <div>
          <BsCalendarDate /> <h3>{format(new Date(meeting.date), 'EEEE, d MMM, yyyy')}</h3>
        </div>
        <div>
          <BsClock />
          <h3>{format(new Date(meeting.startTime), 'HH:mm') + ' - ' + format(new Date(meeting.endTime), 'HH:mm')}</h3>
        </div>
        <div>
          <MdOutlineLocationOn /> <h3>{meeting.location}</h3>
        </div>
      </section>
      <section css={sectionStyle}>
        <h3>Offer from</h3>
        <div>
          <MdEmail />
          <h3>{meeting.ownerEmail}</h3>
        </div>
        <div>
          <MdSimCard /> <h3>{meeting.ownerCompany ?? 'company is not provided'}</h3>
        </div>
        <div>
          <MdSimCard /> <h3>{meeting.ownerPhone ?? 'phone is not provided'}</h3>
        </div>
      </section>
      <CommentSection>
        <h3>Comment</h3>
        <OutlinedInput value={meeting.comment} fullWidth rows={3} multiline />
      </CommentSection>
    </div>
  )
}

const sideStyle = css`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 600px;
  border-right: 1px solid rgba(26, 26, 26, 0.1);
  transition: all 0.22s ease-out;
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 1rem;

  ${media.medium} {
    border-right: none;
  }
`
const nameStyle = css`
  margin: 0 0 3px;
  color: rgba(26, 26, 26, 0.6);
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.4;
`

const eventNameStyle = css`
  margin: 0;
  font-weight: bold;
  font-size: 2rem;
  line-height: 1.4;
`
const sectionStyle = css`
  margin-bottom: 1rem;

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;

    h3 {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1;
    }

    svg {
      font-size: 1.5rem;
      margin-right: 0.8rem;
    }
  }
`

const CommentSection = styled.section`
  min-height: 5rem;
  margin-bottom: 2rem;
`

export default BookingSide
