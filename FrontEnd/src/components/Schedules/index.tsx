import React, { useCallback, useEffect, useMemo, useState } from 'react'
import IconControl from '../IconControl'
import { noScheduleStyle } from './styles'
import { Button, FormGroup, SelectChangeEvent, ToggleButton } from '@mui/material'
import ScheduleCalendar from './ScheduleCalendar'
import { meetingSwitchState } from 'atoms/memberShipTabState'
import { useRecoilState } from 'recoil'
import ScheduleTable from './ScheduleTable'
import { SearchContainer } from 'components/Events/styles'
import SearchBox from '../SearchBox'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { getMeetingsCursor } from 'lib/api/meeting/getMeetings'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

type ScheduleViewProps = {}
export type searchSelect = 'email' | 'title'

function Schedules({}: ScheduleViewProps) {
  const [checked, setChecked] = useRecoilState(meetingSwitchState)
  const [meetingFilter, setMeetingFilter] = useState('')
  const [type, setType] = useState<searchSelect>('title')
  const [searchType, setSearchType] = useState<searchSelect>('title')
  const { ref, inView } = useInView()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['meetings', meetingFilter, searchType],
    ({ pageParam = 0 }) => getMeetingsCursor(meetingFilter, searchType, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        // page 길이 5이면
        const morePagesExist = lastPage?.length === 3
        if (!morePagesExist) return false
        return pages.flat().length
      },
    }
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev)
  }, [setChecked])

  const onTypeChange = useCallback((event: SelectChangeEvent) => {
    console.log(event.target.value)
    setType(event.target.value as searchSelect)
  }, [])

  const meetings = useMemo(() => {
    if (!data) return []
    return data.pages.flat().filter((meeting) => {
      return !meeting.history
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
      <FormGroup
        row={true}
        style={{ marginBottom: '0.625rem', maxWidth: '80.3125rem', display: 'flex', justifyContent: 'flex-end' }}
      >
        {!checked && (
          <SearchContainer>
            <SearchBox filter={setMeetingFilter} onTypeChange={onTypeChange} type={type} setType={setSearchType} />
          </SearchContainer>
        )}
        <ToggleButton value="check" selected={checked} onChange={handleChange} color={'primary'}>
          <CalendarTodayIcon />
        </ToggleButton>
      </FormGroup>
      {checked ? <ScheduleCalendar meetings={meetings} /> : <ScheduleTable meetings={meetings} />}
      {!meetingFilter && !checked && hasNextPage && (
        <Button
          ref={ref}
          variant={'contained'}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
        >
          View more...
        </Button>
      )}
    </>
  )
}

export default Schedules
