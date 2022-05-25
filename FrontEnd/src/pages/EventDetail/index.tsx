import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import EventDetailContainer from 'components/Events/EventDetailContainer'

export type EventProps = {}

function EventDetail({}: EventProps) {
  const { id } = useParams()

  if (!id) {
    return null
  }

  return (
    <div css={pageStyle}>
      <EventDetailContainer id={id} />
    </div>
  )
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
`

export default EventDetail
