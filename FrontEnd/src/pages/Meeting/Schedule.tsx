import { css } from '@emotion/react'
import Schedules from '../../components/Schedules'

type ScheduleProps = {}

function Schedule({}: ScheduleProps) {
  return (
    <div css={wrapper}>
      <Schedules />
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding: 3rem;
`

export default Schedule
