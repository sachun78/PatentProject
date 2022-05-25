import AddIcon from '@mui/icons-material/Add'
import { Button, CircularProgress, Fab, FormGroup, ToggleButton } from '@mui/material'
import IconControl from 'components/IconControl/IconControl'
import useEventQuery from 'hooks/query/useEventQuery'
import useDateRangeHook from 'hooks/useDateRangeHook'
import { useEventModal } from 'hooks/useEventTitle'
import React, { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import { eventSwitchState } from 'atoms/memberShipTabState'
import EventCalendar from './EventCalendar'
import EventCard from './EventCard'
import EventModal from './EventModal'
import { noScheduleStyle, SearchContainer, wrapper } from './styles'
import { isBefore } from 'date-fns'
import { useCurrentEventState } from 'atoms/eventState'
import EventTable from './EventTable'
import { css } from '@emotion/react'
import { useToggleImageButton } from 'lib/styles/muiStyles'
import SearchBox from '../SearchBox'
import { useQuery } from 'react-query'
import { getEventSearch } from 'lib/api/event/getEvents'

type EventsProps = {}

function Events({}: EventsProps) {
  const { data, isLoading } = useEventQuery({ staleTime: 2000 })
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()
  const [checked, setChecked] = useRecoilState(eventSwitchState)
  const [tableChecked, setTableChecked] = useState(false)
  const [, setEvent] = useCurrentEventState()
  const [searchText, setSearchText] = useState('')

  const { data: searchData, isLoading: searchLoading } = useQuery(
    ['event_search', searchText],
    () => getEventSearch(searchText),
    {
      enabled: !!searchText,
    }
  )

  const handleChange = useCallback(() => {
    setChecked((prev) => !prev)
  }, [setChecked])
  const onTableViewChange = useCallback(() => {
    setTableChecked((prev) => !prev)
  }, [])
  const onClickNewEvent = useCallback(() => {
    setOpen(true)
    setEdit(false)
    setEvent({ id: '', title: '' })

    let temp_date = new Date()
    temp_date.setHours(0, 0, 0, 0)
    setStartDate(temp_date)
    temp_date = new Date()
    temp_date.setHours(23, 59, 0, 0)
    setEndDate(temp_date)
  }, [setEdit, setEndDate, setEvent, setOpen, setStartDate])

  const toggleClass = useToggleImageButton()

  if (isLoading)
    return (
      <div css={noScheduleStyle}>
        <CircularProgress />
        <div>Loading...</div>
      </div>
    )

  if (!data || data.length === 0) {
    return (
      <>
        <div css={noScheduleStyle}>
          <h1>No events were generated.</h1>
          <br />
          <Button variant={'contained'} onClick={onClickNewEvent} style={{ marginLeft: '1rem' }}>
            + Create new event
          </Button>
        </div>
        <EventModal />
      </>
    )
  }

  return (
    <>
      <FormGroup
        row={true}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          maxWidth: '76.25rem',
          position: 'relative',
          top: '-44px',
        }}
        css={groupStyle}
      >
        {!checked && (
          <SearchContainer>
            <SearchBox filter={setSearchText} />
          </SearchContainer>
        )}
        {!checked && (
          <ToggleButton
            value="check"
            aria-label={'card-view'}
            selected={!tableChecked}
            onChange={onTableViewChange}
            color={'primary'}
            classes={toggleClass}
            sx={{
              background: tableChecked ? '' : '#910457 !important',
            }}
          >
            {tableChecked ? <IconControl name={'card'} /> : <IconControl name={'cardSelect'} />}
          </ToggleButton>
        )}
        {!checked && (
          <ToggleButton
            value="check"
            aria-label={'list-view'}
            selected={tableChecked}
            onChange={onTableViewChange}
            color={'primary'}
            classes={toggleClass}
            sx={{ background: !tableChecked ? '' : '#910457 !important' }}
          >
            {!tableChecked ? <IconControl name={'list'} /> : <IconControl name={'listSelect'} />}
          </ToggleButton>
        )}
        <ToggleButton
          value="check"
          aria-label={'calendar'}
          selected={checked}
          onChange={handleChange}
          color={'primary'}
          classes={toggleClass}
          sx={{ background: checked ? '#910457 !important' : '' }}
        >
          {checked ? <IconControl name={'dateSelect'} /> : <IconControl name={'date'} />}
        </ToggleButton>
      </FormGroup>
      {checked ? (
        <EventCalendar /> /*CalendarView*/
      ) : searchText && searchData ? (
        !searchLoading ? (
          searchData.length ? (
            <EventTable events={searchData} />
          ) : (
            <div css={noScheduleStyle}>
              <h1>Content does not exist</h1>
            </div>
          )
        ) : (
          <div css={noScheduleStyle}>
            <CircularProgress />
            <div>Loading...</div>
          </div>
        )
      ) : tableChecked ? (
        <EventTable events={data} /> /*TableView*/
      ) : (
        <div css={wrapper}>
          {data.map((event) => {
            if (isBefore(new Date(event.end_date), new Date())) {
              return null
            }
            return (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                startDate={new Date(event.start_date)}
                endDate={new Date(event.end_date)}
                count={event.meeting_list.length}
              />
            )
          })}
        </div>
      )}

      <Fab sx={{ position: 'fixed', bottom: 103, right: '2rem', zIndex: 10 }} color="primary" onClick={onClickNewEvent}>
        <AddIcon />
      </Fab>
      <EventModal />
    </>
  )
}

const groupStyle = css`
  button + button {
    margin-left: 1.25rem;
  }
`

export default Events
