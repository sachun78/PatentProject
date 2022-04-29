import React, { useCallback, useMemo, useState } from 'react'
import IconControl from '../IconControl'
import { labelStyle, noScheduleStyle } from './styles'
import { Button, FormControlLabel, FormGroup, SelectChangeEvent, Switch } from '@mui/material'
import ScheduleCalendar from './ScheduleCalendar'
import { meetingSwitchState } from 'atoms/memberShipTabState'
import { useRecoilState } from 'recoil'
import { formatDistanceToNow } from 'date-fns'
import ScheduleTable from './ScheduleTable'
import { OptionContainer, SearchContainer } from 'components/Events/styles'
import SearchBox from '../SearchBox'
import { useInfiniteQuery } from 'react-query'
import { getMeetingsCursor } from 'lib/api/meeting/getMeetings'

type ScheduleViewProps = {}
export type searchSelect = 'email' | 'title'

function Schedules({}: ScheduleViewProps) {
  const [checked, setChecked] = useRecoilState(meetingSwitchState)
  const [meetingFilter, setMeetingFilter] = useState('')
  const [type, setType] = useState<searchSelect>('title')

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['meetings', meetingFilter, type],
    ({ pageParam = 0 }) => getMeetingsCursor(meetingFilter, type, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        // page 길이 5이면
        const morePagesExist = lastPage?.length === 3
        if (!morePagesExist) return false
        return pages.flat().length
      },
    }
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const onTypeChange = useCallback((event: SelectChangeEvent) => {
    console.log(event.target.value)
    setType(event.target.value as searchSelect)
  }, [])

  const meetings = useMemo(() => {
    if (!data) return []
    return data.pages.flat().filter((meeting) => {
      const dist = formatDistanceToNow(new Date(meeting.startTime), {
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
      <FormGroup row={true} style={{ marginBottom: '0.625rem', maxWidth: '60rem' }}>
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
        {!checked && (
          <SearchContainer style={{ marginLeft: '0.5rem' }}>
            <SearchBox filter={setMeetingFilter} onTypeChange={onTypeChange} type={type} />
          </SearchContainer>
        )}
      </FormGroup>
      {checked ? <ScheduleCalendar meetings={meetings} /> : <ScheduleTable meetings={meetings} />}
      {!checked && hasNextPage && (
        <Button variant={'contained'} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          View more...
        </Button>
      )}
    </>
  )
}

export default Schedules
