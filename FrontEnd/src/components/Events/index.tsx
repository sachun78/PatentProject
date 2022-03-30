import { css } from '@emotion/react'
import React, { memo } from 'react'
import palette from '../../lib/palette'
import EventModal from './EventModal'
import EventCard from './EventCard'
import useEventQuery from '../../hooks/query/useEventQuery'
import IconControl from '../IconControl/IconControl'
import { CircularProgress, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useEventModal } from '../../hooks/useEventTitle'
import useDateRangeHook from '../../hooks/useDateRangeHook'

type EventViewProps = {}

function Events({}: EventViewProps) {
  const { data, isLoading } = useEventQuery(1)
  const { setOpen, setEdit } = useEventModal()
  const { setStartDate, setEndDate } = useDateRangeHook()

  if (isLoading)
    return <div css={noScheduleStyle}>
      <IconControl name={'welcome'} />
      <CircularProgress />
      <div>Loading...</div>
    </div>

  if (data && data.length === 0) {
    return <div css={noScheduleStyle}>
      <IconControl name={'welcome'} />
      <div>There's no event created.</div>
      <div>Please make a new event.</div>
    </div>
  }

  return <>
    <div css={wrapper}>
      {data?.map((event) => <EventCard key={event.id} id={event.id} title={event.title}
                                       startDate={event.start_date} endDate={event.end_date}
                                       count={event.meeting_list.length} />)}
    </div>
    <Fab sx={{ position: 'fixed', bottom: 60, right: 32 }}
         color='primary'
         onClick={() => {
           setOpen(true)
           setEdit(false)
           setStartDate(new Date())
           setEndDate(new Date())
         }}>
      <AddIcon />
    </Fab>
    <EventModal />
  </>
}

export default memo(Events)

const wrapper = css`
  height: 100%;
  flex: 1;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  min-width: 60rem;

  &:hover, &:focus {
    cursor: pointer;
  }
`

const noScheduleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  svg {
    width: 33%;
    height: 33%;
    margin-top: 5rem;
    min-width: 20rem;
  }

  div {
    margin-top: 10px;
    font-size: 3rem;
    font-weight: 600;
    color: ${palette.purple[600]};
    user-select: none;
  }
`
