import { ContainerBlock } from 'pages/Meeting/styles'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, OutlinedInput } from '@mui/material'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'
import useInput from 'hooks/useInput'
import RequestSection from 'pages/Meeting/meeting-create-form/RequestForm/RequestSection'
import TimeGridInput from '../DatePickerInput/TimeGridInput'
import { useQuery } from 'react-query'
import { getEvent } from '../../lib/api/event/getEvent'
import useDateRangeHook from '../../hooks/useDateRangeHook'
import useDateTimeHook from '../../hooks/useDateTimeHook'
import { IMeeting } from '../../lib/api/types'

export type MeetingChangeProps = {
  place: string
  eventId: string
}

function MeetingChange({ place, eventId }: MeetingChangeProps) {
  const [replace, setReplace] = useInput(place)
  const [comment, onChangeComment] = useInput('')
  const classes = useRemoveOutlineHover()

  const { data: event, isLoading } = useQuery(['event', eventId], getEvent, {
    enabled: !!eventId,
    retry: false,
  })

  const { startDate, endDate } = useDateRangeHook()
  const { date, time, setDate, setTime } = useDateTimeHook()
  const [endTime, setEndTime] = useState<Date | null>(null)

  const onChangeDate = useCallback(
    (change: Date) => {
      setDate(change)
    },
    [setDate]
  )

  const onChangeTime = useCallback(
    (change: Date) => {
      setTime(change)
    },
    [setTime]
  )

  const onChangeEndTime = useCallback((change: Date) => {
    setEndTime(change)
  }, [])

  const filteredTimeEvent = useMemo(() => {
    if (!event) return []
    return (event.meeting_list as IMeeting[]).filter((meeting: IMeeting) => {
      return meeting.status === 'confirm'
    })
  }, [event])

  if (!event) return null

  return (
    <ContainerBlock>
      <form>
        <RequestSection title={'TimeSelect'}>
          <TimeGridInput
            startTime={time}
            endTime={endTime}
            date={date}
            startDate={startDate}
            endDate={endDate}
            timeChange={(sDate: Date, eDate: Date) => {
              onChangeTime(sDate)
              onChangeEndTime(eDate)
            }}
            timeEvent={filteredTimeEvent}
            dateChange={onChangeDate}
            unavailables={event.restricted_time}
          />
        </RequestSection>

        <RequestSection title={'Place'}>
          <OutlinedInput
            type={'text'}
            value={replace}
            onChange={setReplace}
            placeholder={'Enter new Place'}
            classes={classes}
            sx={{ height: 38 }}
            fullWidth
          />
        </RequestSection>
        <RequestSection title={'Comment'}>
          <OutlinedInput
            type={'text'}
            value={comment}
            onChange={onChangeComment}
            placeholder={'Enter a new Comment'}
            classes={classes}
            multiline
            fullWidth
          />
        </RequestSection>
        <Button type={'submit'} variant={'contained'}>
          Change
        </Button>
      </form>
    </ContainerBlock>
  )
}

export default MeetingChange
