import React, { useCallback, useEffect, useMemo, useState } from 'react'
import IconControl from '../IconControl'
import { Button, FormGroup, ToggleButton } from '@mui/material'
import ScheduleCalendar from './ScheduleCalendar'
import { meetingSwitchState } from 'atoms/memberShipTabState'
import { useRecoilState } from 'recoil'
import ScheduleTable from './ScheduleTable'
import { noScheduleStyle, SearchContainer } from 'components/Events/styles'
import SearchBox from '../SearchBox'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { getMeetingsCursor, getMeetingSearch } from 'lib/api/meeting/getMeetings'
import { css } from '@emotion/react'

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
  const { data: searchData, isLoading: searchLoading } = useQuery(
    ['meeting_search', searchText],
    () => getMeetingSearch(searchText),
    {
      enabled: !!searchText,
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
        <h1>There is no upcoming schedule.</h1>
        <h1>Create your schedule through an event.</h1>
      </div>
    )

  return (
    <>
      <FormGroup
        row={true}
        style={{
          marginBottom: '0.625rem',
          maxWidth: '76.25rem',
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'relative',
          transform: 'translate3d(0, -100%, 0)',
          right: 0,
        }}
        css={groupStyle}
      >
        {!checked && (
          <SearchContainer onFocus={onSearchMode}>
            <SearchBox filter={setSearchText} />
          </SearchContainer>
        )}
        {!search && (
          <ToggleButton
            value="check"
            selected={!checked}
            onChange={handleChange}
            color={'primary'}
            sx={{
              borderRadius: '50px',
              border: '1px solid #910457',
              background: !checked ? '#910457 !important' : '',
            }}
          >
            {checked ? <IconControl name={'list'} /> : <IconControl name={'listSelect'} />}
          </ToggleButton>
        )}
        {!search && (
          <ToggleButton
            value="check"
            selected={checked}
            onChange={handleChange}
            color={'primary'}
            sx={{
              borderRadius: '50px',
              border: '1px solid #910457',
              background: checked ? '#910457 !important' : '',
            }}
          >
            {checked ? <IconControl name={'dateSelect'} /> : <IconControl name={'date'} />}
          </ToggleButton>
        )}
      </FormGroup>
      {/*달력 모드인 경우 캘린더*/}
      {checked && <ScheduleCalendar meetings={meetings} />}
      {/*일반 모드인 경우 Table*/}
      {!checked && !search && <ScheduleTable meetings={meetings} />}
      {/*검색 모드인 경우 Table*/}
      {!checked && search && !searchText ? (
        <div>Search Schedule, input meeting name, useremail or name</div>
      ) : searchData && searchData.length ? (
        <ScheduleTable meetings={searchData} />
      ) : (
        <div css={noScheduleStyle}>{searchLoading ? <h1>Searching...</h1> : <h1>There is no result</h1>}</div>
      )}
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

const groupStyle = css`
  button + button {
    margin-left: 1.25rem;
  }
`
