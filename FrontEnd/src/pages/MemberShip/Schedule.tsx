import { css } from '@emotion/react'
import ScheduleView from '../../components/ScheduleView'

type ScheduleProps = {}

function Schedule({}: ScheduleProps) {
  return (
    <div css={wrapper}>
      <ScheduleView type="page" />
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding: 1.5rem;
  padding-right: 0;
  height: 88vh;
`

export default Schedule
