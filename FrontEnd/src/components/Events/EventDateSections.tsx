import React, { memo } from 'react'
import RequestSection from '../RequestForm/RequestSection'
import DatePickerInput from '../DatePickerInput'
import useDateRangeHook from '../../hooks/useDateRangeHook'

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
    <RequestSection title={'Start Date'}>
      <DatePickerInput value={startDate} onChange={setStartDate} maximum={maxDate} />
    </RequestSection>
    <RequestSection title={'End Date'}>
      <DatePickerInput value={endDate} onChange={setEndDate} maximum={maxDate} />
    </RequestSection>
  </>
}

export default EventDateSections
