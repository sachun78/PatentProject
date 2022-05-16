import React, { useCallback, useEffect, useMemo, useState } from 'react'
import IconControl from '../IconControl'
import { noScheduleStyle } from './styles'
import { Button, FormGroup, ToggleButton } from '@mui/material'
import ScheduleCalendar from './ScheduleCalendar'
import { meetingSwitchState } from 'atoms/memberShipTabState'
import { useRecoilState } from 'recoil'
import ScheduleTable from './ScheduleTable'
import { SearchContainer } from 'components/Events/styles'
import SearchBox from '../SearchBox'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { getMeetingsCursor, getMeetingSearch } from 'lib/api/meeting/getMeetings'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'

type ScheduleViewProps = {}

function Schedules({}: ScheduleViewProps) {
  const [checked, setChecked] = useRecoilState(meetingSwitchState)
  const [search, setSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { ref, inView } = useInView()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['meetings'],
    ({ pageParam = 0 }) => getMeetingsCursor(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        // page 길이 5이면
        const morePagesExist = lastPage?.length === 5
        if (!morePagesExist) return false
        return pages.flat().length
      },
    }
  )
  const { data: searchData } = useQuery(['meeting_search', searchText], () => getMeetingSearch(searchText), {
    enabled: !!searchText,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev)
  }, [setChecked])

  const onSearchMode = useCallback(() => {
    setSearch((prev) => !prev)
    setSearchText('')
  }, [setSearch])

  const meetings = useMemo(() => {
    if (!data) return []
    return data.pages.flat().filter((meeting) => {
      return !meeting.history
    })
  }, [data])

  if (isLoading) return <div>Loading...</div>
  if (meetings?.length === 0)
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
        style={{
          marginBottom: '0.625rem',
          maxWidth: '80.3125rem',
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          transform: 'translate3d(-1rem, -105%, 0)',
          right: 0,
        }}
      >
        {!checked && search && (
          <SearchContainer>
            <SearchBox filter={setSearchText} />
          </SearchContainer>
        )}
        {!checked && (
          <ToggleButton
            value="check"
            selected={search}
            onChange={onSearchMode}
            color={'primary'}
            sx={{ borderRadius: '1rem', border: 'none' }}
          >
            {!search ? <SearchIcon /> : <SearchOffIcon />}
          </ToggleButton>
        )}
        {!search && (
          <ToggleButton
            value="check"
            selected={checked}
            onChange={handleChange}
            color={'primary'}
            sx={{ borderRadius: '1rem', border: 'none' }}
          >
            <CalendarTodayIcon />
          </ToggleButton>
        )}
      </FormGroup>
      {/*달력 모드인 경우 캘린더*/}
      {checked && <ScheduleCalendar meetings={meetings} />}
      {/*일반 모드인 경우 Table*/}
      {!checked && !search && <ScheduleTable meetings={meetings} />}
      {/*검색 모드인 경우 Table*/}
      {!checked && search && <ScheduleTable meetings={searchData || []} />}
      {!checked && !search && hasNextPage && (
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
