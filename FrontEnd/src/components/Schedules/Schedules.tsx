import { css } from '@emotion/react'
import ViewBase from '../ViewBase'
import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import ScheduleCard from './ScheduleCard'
import ScheduleCardPlus from './ScheduleCardPlus'

type ScheduleViewProps = {
  preview?: boolean
}

function Schedules({ preview }: ScheduleViewProps) {
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

  useEffect(() => {
    if (location.pathname === '/schedule')
      console.log('스케쥴 뷰')
  }, [location.pathname])

  return (
    <ViewBase title='SCHEDULE'>
      <div css={tableStyle}>
        {testData.map((v) => (
          <ScheduleCard from={v.from} to={v.to} comment={v.comment} place={v.place} date={v.date.toDateString()}
                        time={v.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />))}
        <ScheduleCardPlus />
      </div>
    </ViewBase>
  )
}

const tableStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  height: 100%;
`

export default Schedules
