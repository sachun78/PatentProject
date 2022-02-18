import { useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

export type EventProps = {}

function Event({}: EventProps) {
  const location = useLocation()
  console.log(location.pathname.split('/')[3])
  return <div css={pageStyle}>
    <div>Left Info?</div>
    <div>Right Info?</div>
  </div>
}

const pageStyle = css`
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 3rem;
  background: #fff;
`

export default Event
