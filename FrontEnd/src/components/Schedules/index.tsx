import React from 'react'
import ScheduleCard from './ScheduleCard'
import IconControl from '../IconControl'
import useMeetingQuery from '../../hooks/query/useMeetingQuery'
import { noScheduleStyle, tableStyle } from './styles'

type ScheduleViewProps = {}

function Schedules({}: ScheduleViewProps) {
  const { data, isLoading } = useMeetingQuery(1)

  if (isLoading) return <div css={noScheduleStyle}>
    <IconControl name={'welcome'} />
    <div>Loading...</div>
  </div>

  return <>
    {data?.length === 0
      ? (<div css={noScheduleStyle}>
        <IconControl name={'welcome'} />
        <div>There's no schedule created.</div>
        <div>Please make a new schedule.</div>
      </div>)
      : (<div css={tableStyle}>
        {data?.map((v) => <ScheduleCard key={v.id}
                                        from={v.ownerEmail} to={v.toEmail}
                                        comment={v.comment}
                                        place={v.location}
                                        date={v.date} time={v.time}
                                        title={v.title}
                                        state={v.status} id={v.id} />)}
      </div>)}
  </>
}


export default Schedules
