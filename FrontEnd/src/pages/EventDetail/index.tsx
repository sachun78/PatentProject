import { useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import EventDetailContainer from 'components/Events/EventDetailContainer'

export type EventProps = {}

function EventDetail({}: EventProps) {
  const location = useLocation()

  if (location.pathname.split('/')[3] === '') {
    return null
  }

  return <div css={pageStyle}>
    <EventDetailContainer id={location.pathname.split('/')[3]} />
  </div>
}

const pageStyle = css`
  width: 90rem;
  display: flex;
  flex-direction: column;
`

export default EventDetail
