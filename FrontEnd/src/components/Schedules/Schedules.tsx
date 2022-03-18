import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ScheduleCard from './ScheduleCard'
import ScheduleCalendar from './ScheduleCalendar'
import IconControl from '../IconControl'
import { css } from '@emotion/react'
import palette from '../../lib/palette'
import useMeetingQuery from '../../hooks/query/useMeetingQuery'

type ScheduleViewProps = {
  isCalendar?: boolean
}

function Schedules({ isCalendar = false }: ScheduleViewProps) {
  const location = useLocation()
  const { data } = useMeetingQuery(1)

  useEffect(() => {
    if (location.pathname === '/schedule')
      console.log('스케쥴 뷰')
  }, [location.pathname])
  return <>
    {isCalendar ? <ScheduleCalendar currentEvents={[]} weekendsVisible={true} />
      : (<div>
        {data?.length === 0 ? (<div css={noScheduleStyle}>
            <IconControl name={'welcome'} />
            <div>There's no schedule created.</div>
            <div>Please make a new schedule.</div>
          </div>)
          : (<div css={tableStyle}>
            {data?.map((v, i) => <ScheduleCard key={v.id}
                                               from={v.ownerEmail} to={v.toEmail}
                                               comment={v.comment}
                                               place={v.location}
                                               date={v.date} time={v.time}
                                               title={v.title}
                                               state={v.status} id={v.id} />)}
          </div>)}
      </div>)}
  </>
}

const noScheduleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  svg {
    width: 50%;
    height: 50%;
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
const tableStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  height: 100%;
`

export default Schedules
