import { Link, Navigate, useLocation } from 'react-router-dom'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import {
  Accordion, AccordionDetails, AccordionSummary, Box,
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material'
import { css } from '@emotion/react'
import IconControl from 'components/IconControl'
import { ContainerBlock, MeetingSection } from './styles'

export type MeetingDetailProps = {}

function MeetingDetail({}: MeetingDetailProps) {
  const location = useLocation()
  const code = useMemo(() => location.pathname.split('/')[3], [location])
  const { data, isLoading, error } = useQuery(['meeting', code], () => getMeetingOne(code), {
    retry: false,
    refetchOnWindowFocus: false
  })

  if (location.pathname.split('/')[3] === '') {
    return <Navigate replace to={'/'} />
  }

  if (error) {
    if (!toast.isActive('meeting-detail')) {
      toast.error('오류가 발생했습니다.', {
        toastId: 'meeting-detail',
        pauseOnFocusLoss: false,
        pauseOnHover: false
      })
    }
    return <Navigate replace to={'/'} />
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <Stack direction={'row'}>
    <ContainerBlock>
      <h1>{data.title} [{data.status}]</h1>
      <MeetingSection>
        <h2>Organizer</h2>
        <p>{data.ownerEmail}</p>
      </MeetingSection>
      <MeetingSection>
        <h2>Participants</h2>
        <Stack direction='row' spacing={2}>
          <p>{data.toEmail}</p>
          <Link to={`/u/${data.toEmail}`}><Button variant='contained' style={{ height: '24px' }}>정보확인</Button></Link>
        </Stack>
      </MeetingSection>
      <MeetingSection>
        <h2>Schedule Information</h2>
        <p>{data.location}</p>
        <p> {data.date.replace(/T.*$/, '')} {new Date(data.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </MeetingSection>
      <MeetingSection>
        <h2>Request Message</h2>
        <p> {data.comment}</p>
      </MeetingSection>
      <Box display='flex' justifyContent='space-between'>
        {data.status === 'confirm' && <Button variant='contained'>Result</Button>}
        {data.status === 'replan'
          && <>
            <Button variant='contained' style={{ width: '180px' }}>Confirm</Button>
            <Button variant='contained' style={{ width: '180px', backgroundColor: '#9C9C9C' }}>Cancel</Button>
          </>}
      </Box>
    </ContainerBlock>
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<IconControl name={'plus'} />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography>"Request" from ME to Opponent</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            message/ time/ place/ data
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<IconControl name={'plus'} />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>"Replan" from Opponent to me</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            message/ time/ place/ data
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<IconControl name={'plus'} />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography>"Replan(change)" from me to Opponent</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            message/ time/ place/ data
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<IconControl name={'plus'} />}
          aria-controls='panel4a-content'
          id='panel4a-header'
        >
          <Typography>"Confirm" or Reject by Opponent</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            message/ time/ place/ data
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  </Stack>
}

export default MeetingDetail
