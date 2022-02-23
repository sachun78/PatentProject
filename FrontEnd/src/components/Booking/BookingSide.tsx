import { css } from '@emotion/react'
import { BsCalendarDate, BsClock } from 'react-icons/bs'
import { MdEmail, MdOutlineLocationOn, MdPerson, MdSimCard } from 'react-icons/md'

export type BookingSideProps = {}

function BookingSide({}: BookingSideProps) {
  return <div css={sideStyle}>
    <section css={sectionStyle}>
      <span css={nameStyle}>Name</span>
      <h1 css={eventNameStyle}>Event Title</h1>
    </section>
    <section css={sectionStyle}>
      <div><BsCalendarDate /> <h3>Date</h3></div>
      <div><BsClock /> <h3>Time</h3></div>
      <div><MdOutlineLocationOn /> <h3>Location</h3></div>
    </section>
    <section css={sectionStyle}>
      <div><MdPerson /> <h3>Offer from</h3></div>
      <div><MdEmail /> <h3>Email</h3></div>
      <div><MdSimCard /> <h3>Company</h3></div>
    </section>
    <section css={sectionStyle}>
      <div><MdPerson /> <h3>Offer to</h3></div>
      <div><MdEmail /> <h3>Email</h3></div>
      <div><MdSimCard /> <h3>Company (if exist or if user?)</h3></div>
    </section>
    <section css={sectionStyle}>
      <h3>Comment Messages</h3>
    </section>
  </div>
}

const sideStyle = css`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 300px;
  border-right: 1px solid rgba(26, 26, 26, 0.1);
  transition: all 0.22s ease-out;
  padding-top: 2.5rem;
  padding-left: 3rem;
  padding-right: 1rem;
`
const nameStyle = css`
  margin: 0 0 3px;
  color: rgba(26, 26, 26, 0.6);
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 24px;
`

const eventNameStyle = css`
  margin: 0;
  font-weight: bold;
  font-size: 2.8rem;
  line-height: 32px;
`
const sectionStyle = css`
  margin-bottom: 2.4rem;

  > div {
    display: flex;

    margin-bottom: 1.2rem;
    align-items: center;

    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 2.4rem;
    }

    svg {
      font-size: 2.4rem;
      margin-right: 1rem;
    }
  }
`

export default BookingSide
