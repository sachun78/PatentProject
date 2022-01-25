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
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  height: 88vh;

  .membership + .membership {
    padding-left: 0;
  }
`

export default Member
