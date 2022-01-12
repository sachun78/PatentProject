import { css } from '@emotion/react'
import EventView from '../../components/EventView/EventView'
import ScheduleView from '../../components/ScheduleView'

type MemberShipProps = {}

function MemberShip({}: MemberShipProps) {
  return (
    <div css={wrapper} >
      <ScheduleView />
      <EventView />
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

export default MemberShip
