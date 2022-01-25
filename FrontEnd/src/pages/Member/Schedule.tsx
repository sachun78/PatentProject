import { css } from '@emotion/react'
import Schedules from '../../components/Schedules'

type ScheduleProps = {}

function Schedule({}: ScheduleProps) {
  return (
    <div css={wrapper}>
      <Schedules type="page" />
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

export default Schedule
