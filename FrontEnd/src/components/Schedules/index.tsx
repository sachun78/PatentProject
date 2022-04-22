import React, { useMemo } from 'react'
import IconControl from '../IconControl'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import { labelStyle, noScheduleStyle } from './styles'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import ScheduleCalendar from './ScheduleCalendar'
import { meetingSwitchState } from 'atoms/memberShipTabState'
import { useRecoilState } from 'recoil'
import { formatDistanceToNow } from 'date-fns'
import ScheduleTable from './ScheduleTable'
import { OptionContainer } from 'components/Events/styles'

type ScheduleViewProps = {}

function Schedules({}: ScheduleViewProps) {
  const { data, isLoading } = useMeetingQuery(1, {
    staleTime: 2000,
  })
  const [checked, setChecked] = useRecoilState(meetingSwitchState)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const meetings = useMemo(() => {
    if (!data) return []
    return data.filter((meeting) => {
      const dist = formatDistanceToNow(new Date(meeting.date), {
        addSuffix: true,
      })
      return !dist.includes('ago') && !meeting.history
    })
  }, [data])

  if (isLoading) return <div>Loading...</div>
  if (meetings?.length === 0)
    return (
      <div css={noScheduleStyle}>
        <IconControl name={'welcome'} />
        <div>There is no registered schedule.</div>
        <div>Register your schedule through an event.</div>
      </div>
    )

  return (
    <>
      <FormGroup row={true} style={{ marginBottom: '20px' }}>
        <OptionContainer>
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
        </OptionContainer>
      </FormGroup>
      {checked ? <ScheduleCalendar /> : <ScheduleTable meetings={meetings} />}
    </>
  )
}

export default Schedules
