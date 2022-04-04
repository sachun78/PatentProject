import { useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import EventDetailLeft from '../../components/Events/EventDetailLeft'

export type EventProps = {}

function EventDetail({}: EventProps) {
  const location = useLocation()
  if (location.pathname.split('/')[3] === '') {
    return null
  }

  return <div css={pageStyle}>
    <div css={blockWrapper}>
      <EventDetailLeft id={location.pathname.split('/')[3]} />
    </div>
    <div css={blockWrapper}>Right Selection</div>
  </div>
}

const pageStyle = css`
  display: flex;
  justify-content: center;
  width: 90rem;
  padding: 3rem;
  margin-top: 2rem;
  border-radius: 0.8rem;
  border: 1px solid #e6e6e6;
`

const blockWrapper = css`
  display: flex;
  flex-direction: column;
  width: 50%;
  &:first-of-type {
    border-right: 1px solid #e0e0e0;
  }
`

export default EventDetail
