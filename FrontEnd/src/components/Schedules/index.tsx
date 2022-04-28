import React, { useCallback, useMemo, useState } from 'react'
import IconControl from '../IconControl'
import useMeetingQuery from 'hooks/query/useMeetingQuery'
import { labelStyle, noScheduleStyle } from './styles'
import { FormControlLabel, FormGroup, SelectChangeEvent, Switch } from '@mui/material'
import ScheduleCalendar from './ScheduleCalendar'
import { meetingSwitchState } from 'atoms/memberShipTabState'
import { useRecoilState } from 'recoil'
import { formatDistanceToNow } from 'date-fns'
import ScheduleTable from './ScheduleTable'
import { OptionContainer, SearchContainer } from 'components/Events/styles'
import SearchBox from '../SearchBox'

type ScheduleViewProps = {}
export type searchSelect = 'email' | 'title'

function Schedules({}: ScheduleViewProps) {
  const [checked, setChecked] = useRecoilState(meetingSwitchState)
  const [meetingFilter, setMeetingFilter] = useState('')
  const [type, setType] = useState<searchSelect>('title')

  const { data, isLoading } = useMeetingQuery(meetingFilter, type, {
    staleTime: 2000,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const onTypeChange = useCallback((event: SelectChangeEvent) => {
    console.log(event.target.value)
    setType(event.target.value as searchSelect)
  }, [])

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
  if (meetings?.length === 0 && !meetingFilter)
    return (
      <div css={noScheduleStyle}>
        <IconControl name={'welcome'} />
        <div>There is no upcoming schedule.</div>
        <div>Create your schedule through an event.</div>
      </div>
    )

  return (
    <>
      <FormGroup row={true} style={{ marginBottom: '0.625rem', maxWidth: '80.3125rem' }}>
        <SearchContainer style={{ marginRight: '1rem' }}>
          <SearchBox filter={setMeetingFilter} onTypeChange={onTypeChange} type={type} />
        </SearchContainer>
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
