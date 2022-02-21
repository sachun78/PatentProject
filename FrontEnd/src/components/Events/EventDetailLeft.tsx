import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { MdCalendarToday } from 'react-icons/md'
import { getEvent } from '../../lib/api/event/getEvent'
import { useUserState } from '../../atoms/authState'

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
    <h3 css={titleNameStyle}>Related Meet [{event.meeting_list.length}]</h3>
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

export default EventDetailLeft
