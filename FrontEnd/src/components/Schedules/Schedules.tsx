import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import ScheduleCard from './ScheduleCard'
import ScheduleCalendar from './ScheduleCalendar'
import IconControl from '../IconControl'
import { css } from '@emotion/react'
import palette from '../../lib/palette'

type ScheduleViewProps = {
  isCalendar?: boolean
}

type TTestData = {
  from: string,
  to: string,
  event: string,
  comment: string,
  state: number,
  place: string,
  time: Date,
  date: Date
}

function Schedules({ isCalendar = false }: ScheduleViewProps) {
  const location = useLocation()
  const testData = useMemo(() => ([{
    from: 'ryanhe4@gamil.com',
    to: 'ryan4321@naver.com',
    event: '2022INTA',
    comment: 'hihihi',
    state: 1,
    place: '성수',
    time: new Date(),
    date: new Date()
  }, {
    from: 'ryanhe4@gamil.com',
    to: 'ryan4321@naver.com',
    event: '2022INTA',
    comment: 'hihihi',
    state: 1,
    place: '성수',
    time: new Date(),
    date: new Date()
  }, {
    from: 'ryanhe4@gamil.com',
    to: 'ryan4321@naver.com',
    event: '2022INTA',
    comment: 'hihihi',
    state: 2,
    place: '성수',
    time: new Date(),
    date: new Date()
  }, {
    from: 'ryanhe4@gamil.com',
    to: 'ryan4321@naver.com',
    event: '2022INTA',
    comment: 'hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi',
    state: 3,
    place: '성수',
    time: new Date(),
    date: new Date()
  }]), [])

  const testNoData: TTestData[] = useMemo(() => ([]), [])

  useEffect(() => {
    if (location.pathname === '/schedule')
      console.log('스케쥴 뷰')
  }, [location.pathname])
  return <>
    {isCalendar ? <ScheduleCalendar currentEvents={[]} weekendsVisible={true} />
      : (
        <div>
          {testNoData.length === 0 ? (<div css={noScheduleStyle}>
              <IconControl name={'welcome'} />
              <div>There are no schedules created.</div>
              <div>Please make a new schedule.</div>
            </div>)
            : (<div css={tableStyle}>
              {testNoData.map((v, i) => <ScheduleCard key={v.from + v.to + i} from={v.from} to={v.to}
                                                      comment={v.comment}
                                                      place={v.place}
                                                      date={v.date.toDateString()}
                                                      time={v.date.toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                      })} />)}
            </div>)
          }
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
  }

  div {
    margin-top: 10px;
    font-size: 3rem;
    font-weight: 600;
    color: ${palette.blueGrey[600]};
  }
`
const tableStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  height: 100%;
`

export default Schedules
