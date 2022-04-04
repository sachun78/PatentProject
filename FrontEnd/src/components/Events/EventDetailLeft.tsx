import React, { useEffect } from 'react'
import { MdCalendarToday } from 'react-icons/md'
import { getEvent } from '../../lib/api/event/getEvent'
import { useUserState } from '../../atoms/authState'
import ScheduleCard from '../Schedules/ScheduleCard'
import { css } from '@emotion/react'

export type EventDetailLeftProps = {
  id: string
}

function EventDetailLeft({ id }: EventDetailLeftProps) {
  const [event, setEvent] = React.useState<any | null>(null)
  const [user] = useUserState()
  useEffect(() => {
    async function fetchEvent() {
      try {
        return await getEvent(id)
      } catch (e) {
        console.error(e)
      }
    }

    fetchEvent().then((res) => {
      setEvent(res)
    })
  }, [id])

  if (!event) return (<div>Loading!</div>)

  return <>
    <h3 css={titleNameStyle}>{user?.username}</h3>
    <h1 css={titleEventStyle}>{event.title}</h1>
    <section css={dateSectionStyle}><MdCalendarToday />
      <span>Begin : <b>{event.start_date.replace(/T.*$/, '')}</b></span>
    </section>
    <section css={dateSectionStyle}><MdCalendarToday />
      <span>End : <b>{event.end_date.replace(/T.*$/, '')}</b></span>
    </section>
    {event.meeting_list.length > 0 && <>
      <h3 css={titleNameStyle}>Created Meet [{event.meeting_list.length}]</h3>
      <div>{event.meeting_list.map((meeting: any) => {
        return <ScheduleCard key={meeting.id}
                             from={meeting.ownerEmail} to={meeting.toEmail}
                             comment={meeting.comment}
                             place={meeting.location}
                             date={meeting.date} time={meeting.time}
                             title={meeting.title}
                             state={meeting.status} id={meeting.id} />
      })}
      </div>
    </>}
  </>
}

const titleNameStyle = css`
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  margin-bottom: 0.5rem;
`
const titleEventStyle = css`
  font-size: 3rem;
  line-height: 1.5;
  font-weight: bold;
  margin-bottom: 2rem;
`
const dateSectionStyle = css`
  display: flex;
  align-items: center;

  svg {
    font-size: 2.4rem;
    margin-right: 0.8rem;
  }

  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const createdMeetStyle =css`
  
`

export default EventDetailLeft
