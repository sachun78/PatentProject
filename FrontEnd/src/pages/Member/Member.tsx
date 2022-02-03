import { css } from '@emotion/react'
import Events from '../../components/Events/Events'
import Schedules from '../../components/Schedules'

type MemberShipProps = {}

function Member({}: MemberShipProps) {
  return (
    <div css={wrapper} >
      <Schedules />
      <Events />
    </div>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`

export default Member
