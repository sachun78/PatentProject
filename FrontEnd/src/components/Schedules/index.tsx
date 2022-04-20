import React from 'react'
import ScheduleCard from './ScheduleCard'
import IconControl from '../IconControl'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import { labelStyle, noScheduleStyle, tableStyle } from './styles'
import { FormControlLabel, Switch } from '@mui/material'
import ScheduleCalendar from './ScheduleCalendar'
import { meetingSwitchState } from 'atoms/memberShipTabState'
import { useRecoilState } from 'recoil'
import ScheduleSkeleton from './ScheduleSkeleton'
import { formatDistanceToNow } from 'date-fns'

type ScheduleViewProps = {}

function Schedules({}: ScheduleViewProps) {
  const { data, isLoading } = useMeetingQuery(1)
  const [checked, setChecked] = useRecoilState(meetingSwitchState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  if (isLoading)
    return (
      <div css={tableStyle}>
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
        <ScheduleSkeleton />
      </div>
    )

  if (data?.length === 0)
    return (
      <div css={noScheduleStyle}>
        <IconControl name={'welcome'} />
        <div>There's no schedule created.</div>
        <div>Please make a new schedule.</div>
      </div>
    )

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            edge={'end'}
            checked={checked}
            onChange={handleChange}
            name={'checked'}
            inputProps={{ 'aria-label': 'schedule-calendar' }}
          />
        }
        label={checked ? 'CALENDAR' : 'CARD'}
        css={labelStyle}
      />
      {checked ? (
        <ScheduleCalendar />
      ) : (
        <div css={tableStyle}>
          {data?.reverse().map((v) => {
            const dist = formatDistanceToNow(new Date(v.date), {
              addSuffix: true,
            })
            if (dist.includes('ago')) return null
            return (
              <ScheduleCard
                key={v.id}
                from={v.ownerEmail}
                to={v.toEmail}
                comment={v.comment}
                place={v.location}
                date={v.date}
                time={v.time}
                title={v.title}
                state={v.status}
                id={v.id}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Schedules
