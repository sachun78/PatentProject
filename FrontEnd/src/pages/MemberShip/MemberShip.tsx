import { css } from '@emotion/react'
import ScheduleView from '../../components/ScheduleView'

type MemberShipProps = {}

function MemberShip({}: MemberShipProps) {
  return (
    <div css={wrapper}>
      <ScheduleView />
      <ScheduleView />
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding: 1.5rem;
  padding-right: 0;
  height: 88vh;
`

export default MemberShip
