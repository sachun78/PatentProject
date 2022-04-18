import React from 'react'
import DatePickerInput from '../DatePickerInput'
import useDateRangeHook from 'hooks/useDateRangeHook'
import styled from '@emotion/styled'

export type EventDateSectionsProps = {}

function EventDateSections({}: EventDateSectionsProps) {
  const {
    endDate,
    setEndDate,
    setStartDate,
    startDate,
    maxDate
  } = useDateRangeHook()

  return <>
    <EventDateSection>
      <h1>Start Date</h1>
      <DatePickerInput value={startDate} onChange={setStartDate} maximum={maxDate} />
    </EventDateSection>
    <EventDateSection>
      <h1>End Date</h1>
      <DatePickerInput value={endDate} onChange={setEndDate} maximum={maxDate} />
    </EventDateSection>
  </>
}

const EventDateSection = styled.div`
  margin-top: 1.3125rem;

  h1 {
    color: #6C6C6C;
    font: normal normal 800 16px/18px NanumSquareOTF;
    margin: 0;
  }
`

export default EventDateSections
