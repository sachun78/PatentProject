import { Link, Navigate, useLocation } from 'react-router-dom'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import {
  Accordion, AccordionDetails, AccordionSummary,
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material'
import { css } from '@emotion/react'
import IconControl from 'components/IconControl'

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
    <Container maxWidth='xs' sx={{ mt: 0, p: 3, backgroundColor: 'palegoldenrod', borderRadius: '16px' }}>
      <h1>{data.title}</h1>
      <section>
        <h2>Participants</h2>
        <p>{data.toEmail}</p>
        <Link to={`/u/${data.toEmail}`}><Button variant='contained'>정보확인</Button></Link>
      </section>
      <section>
        <h2>Schedule Information</h2>
        <Stack direction='row' spacing={2}>
          <div><p><b>Date</b> {data.date.replace(/T.*$/, '')}</p></div>
          <div><p>{new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></div>
        </Stack>
        <p><b>Place : </b>{data.location}</p>
        <p><b>Message : </b> {data.comment}</p>
        <p><b>State : </b>{data.status}</p>
      </section>
      <div css={buttonGroupStyle}>
        {data.status === 'confirm' && <Button variant='contained'>Result</Button>}
        {data.status === 'replan' && <Button variant='contained'>Confirm</Button>}
        {data.status !== 'none' && <Button variant='contained'>Change</Button>}
        {data.status !== 'none' && < Button variant='contained'>Reject</Button>}
      </div>
    </Container>
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<IconControl name={'plus'} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
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
    </div>
  </Stack>
}

const buttonGroupStyle = css`
  display: flex;
  justify-content: space-between;
`

export default MeetingDetail
