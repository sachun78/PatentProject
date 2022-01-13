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
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

export default Schedule
