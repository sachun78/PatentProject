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
import { useToggleImageButton } from 'lib/styles/muiStyles'

type ScheduleViewProps = {}

function Schedules({}: ScheduleViewProps) {
  const [checked, setChecked] = useRecoilState(meetingSwitchState)
  const [searchText, setSearchText] = useState('')
  const { ref, inView } = useInView()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['meetings'],
    ({ pageParam = 0 }) => getMeetingsCursor(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        // page 길이 5이면
        const morePagesExist = lastPage?.length === 10
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

  const meetings = useMemo(() => {
    if (!data) return []
    return data.pages.flat().filter((meeting) => {
      return !meeting.history
    })
  }, [data])

  const toggleClass = useToggleImageButton()

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
          marginTop: '-0.75rem',
          marginBottom: '1.25rem',
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
          <SearchContainer>
            <SearchBox filter={setSearchText} />
          </SearchContainer>
        )}
        {!searchText && (
          <ToggleButton
            value="check"
            selected={!checked}
            onChange={handleChange}
            color={'primary'}
            classes={toggleClass}
            sx={{ background: !checked ? '#910457 !important' : '' }}
          >
            {checked ? <IconControl name={'list'} /> : <IconControl name={'listSelect'} />}
          </ToggleButton>
        )}
        {!searchText && (
          <ToggleButton
            value="check"
            selected={checked}
            onChange={handleChange}
            color={'primary'}
            classes={toggleClass}
            sx={{ background: checked ? '#910457 !important' : '' }}
          >
            {checked ? <IconControl name={'dateSelect'} /> : <IconControl name={'date'} />}
          </ToggleButton>
        )}
      </FormGroup>
      {/*달력 모드인 경우 캘린더*/}
      {checked && <ScheduleCalendar meetings={meetings} />}
      {/*일반 모드인 경우 Table*/}
      {!checked && !searchText && <ScheduleTable meetings={meetings} />}
      {/*검색 모드인 경우 Table*/}
      {!checked &&
        searchText &&
        (searchData && searchData.length ? (
          <ScheduleTable meetings={searchData} />
        ) : (
          <div css={noScheduleStyle}>{searchLoading ? <h1>Searching...</h1> : <h1>There is no result</h1>}</div>
        ))}
      {!checked && !searchText && hasNextPage && (
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
