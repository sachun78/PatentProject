import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import React, { useCallback } from 'react'
import { Box, Button, OutlinedInput, Stack } from '@mui/material'
import { ContainerBlock, MeetingSection } from './styles'
import { getEvent } from 'lib/api/event/getEvent'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { format } from 'date-fns'

export type MeetingResultProps = {}

function MeetingResult({}: MeetingResultProps) {
  const { id } = useParams()
  const { data: metData } = useQuery(
    ['meeting', id],
    () => getMeetingOne(id ?? ''),
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5000,
      enabled: !!id,
    }
  )

  const { data: eventData, isLoading } = useQuery(
    ['event', metData.eventId],
    getEvent,
    {
      enabled: !!metData.eventId,
      retry: false,
    }
  )

  const onSubmit = useCallback((e) => {
    e.preventDefault()
  }, [])

  if (isLoading || !eventData) {
    return <div>Loading</div>
  }

  if (!metData) {
    return <Navigate to={'..'} />
  }

  return (
    <Stack direction={'row'} spacing={2}>
      <ContainerBlock>
        <h1>
          {eventData.title}::{metData.title}
        </h1>
        <MeetingSection>
          <h2>Met People</h2>
          <p>{metData.toEmail}</p>
        </MeetingSection>
        <MeetingSection>
          <h2>Met Date</h2>
          <p>
            {format(new Date(metData.date), 'yyyy-MM-dd')}{' '}
            {format(new Date(metData.time), 'HH:mm aaa')}
          </p>
        </MeetingSection>
        <MeetingSection>
          <h2>Met Place</h2>
          <p>{metData.location}</p>
        </MeetingSection>
      </ContainerBlock>
      <ContainerBlock>
        <form onSubmit={onSubmit}>
          <MeetingSection>
            <h2>Result</h2>
            <OutlinedInput rows={4} multiline />
          </MeetingSection>
          <MeetingSection>
            <h2>Photo</h2>
            <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
              <Button>Upload</Button>
            </Box>
          </MeetingSection>
          <Button type={'submit'} fullWidth variant={'contained'}>
            Save
          </Button>
        </form>
      </ContainerBlock>
    </Stack>
  )
}

export default MeetingResult
