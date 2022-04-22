import { Navigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import React, { useCallback } from 'react'
import {
  Box,
  Button,
  FormControlLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from '@mui/material'
import { ContainerBlock, MeetingSection } from '../../pages/Meeting/styles'
import { getEvent } from 'lib/api/event/getEvent'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import useInput from 'hooks/useInput'
import { createMeetingResult } from 'lib/api/meeting/createMeetingResult'

export type MeetingResultProps = {}

function MeetingResult({}: MeetingResultProps) {
  const { id } = useParams()
  const {
    data: metData,
    isLoading: isLoadingMet,
    refetch,
  } = useQuery(['meeting', id], () => getMeetingOne(id ?? ''), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  const [result, onChange, setResult] = useInput('')
  const [metValue, setMetValue] = React.useState('')

  const onMetChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMetValue(event.target.value)
    },
    [setMetValue]
  )
  const { data: eventData, isLoading } = useQuery(
    ['event', metData.eventId ?? ''],
    getEvent,
    {
      enabled: !!metData.eventId,
      retry: false,
    }
  )
  const metResultMut = useMutation(createMeetingResult, {
    onSuccess: () => {
      refetch()
    },
    onSettled: () => {
      setResult('')
      setMetValue('')
    },
  })

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!id) {
        return
      }
      if (!result.trim()) {
        alert('Please fill out the results')
        return
      }

      if (!metValue) {
        alert('please select met state')
        return
      }

      metResultMut.mutate({
        id,
        result: result.trim(),
        status: metValue === 'met',
      })
    },
    [id, metResultMut, metValue, result]
  )

  if (isLoading || isLoadingMet || !eventData) {
    return <div>Loading</div>
  }
  if (!metData) {
    return <Navigate to={'..'} />
  }

  return (
    <>
      <ContainerBlock>
        {!metData.history ? (
          <form onSubmit={onSubmit}>
            <MeetingSection>
              <h2>Result</h2>
              <OutlinedInput
                minRows={4}
                multiline
                value={result}
                onChange={onChange}
              />
            </MeetingSection>
            <MeetingSection>
              <h2>Photo</h2>
              <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                <Button>Upload</Button>
              </Box>
            </MeetingSection>
            <MeetingSection>
              <h2>Meeting status</h2>
              <RadioGroup row onChange={onMetChange} value={metValue}>
                <FormControlLabel value="met" control={<Radio />} label="Met" />
                <FormControlLabel
                  value="fail"
                  control={<Radio />}
                  label="Failure to meet"
                />
              </RadioGroup>
            </MeetingSection>

            <Button type={'submit'} fullWidth variant={'contained'}>
              Save
            </Button>
          </form>
        ) : (
          <>
            <MeetingSection>
              <h2>Result</h2>
              <OutlinedInput
                minRows={4}
                multiline
                value={metData.history.result}
              />
            </MeetingSection>
            {metData.photopath && (
              <MeetingSection>
                <h2>Photo</h2>
                <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                  <Button>Upload</Button>
                </Box>
              </MeetingSection>
            )}
            <MeetingSection>
              <h2>Meeting status</h2>
              <RadioGroup row value={metData.status ? 'met' : 'fail'}>
                {metData.status && (
                  <FormControlLabel
                    value="met"
                    control={<Radio />}
                    label="Met"
                  />
                )}
                {!metData.status && (
                  <FormControlLabel
                    value="fail"
                    control={<Radio />}
                    label="Failure to meet"
                  />
                )}
              </RadioGroup>
            </MeetingSection>
          </>
        )}
      </ContainerBlock>
    </>
  )
}

export default MeetingResult
