import { Link, Navigate, useParams } from 'react-router-dom'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getMeetingOne } from 'lib/api/meeting/getMeetingOne'
import { toast } from 'react-toastify'
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Stack, Typography } from '@mui/material'
import { css } from '@emotion/react'
import IconControl from 'components/IconControl'

export type MeetingDetailProps = {}

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.'
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  }
]

function MeetingDetail({}: MeetingDetailProps) {
  const params = useParams()
  const code = useMemo(() => params.id, [params])
  const { data, isLoading, error } = useQuery(['meeting', code], () => getMeetingOne(code!), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!code
  })

  if (!code) {
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
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<IconControl name={'plus'} />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    <Container>
      스케줄 컨펌 HISTORY 표시<br /><br />
      1. Request me -&gt; Opponent<br />
      2. Replan Opponent -&gt; me<br />
      3. Change(replan) me -&gt; Opponent<br />
      4. Confirm or Reject Opponent<br />
    </Container>
  </Stack>
}

const buttonGroupStyle = css`
  display: flex;
  justify-content: space-between;
`

export default MeetingDetail
