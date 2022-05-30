import styled from '@emotion/styled'
import { Box, Button, OutlinedInput } from '@mui/material'
import { ContainerBlock, MeetingSection } from 'pages/Meeting/styles'
import React from 'react'

const ConferenceWrite = () => {
  return (
    <>
      <ContainerBlock>
        <form
          onSubmit={() => {}}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
        >
          <MeetingSection>
            <h2>Title</h2>
            <OutlinedInput
              minRows={1}
              multiline
              value={''}
              placeholder={'Enter Conference Title here'}
              onChange={() => {}}
            />
          </MeetingSection>
          <MeetingSection>
            <h2>Photo</h2>
            <input
              ref={null}
              onChange={() => {}}
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              name="mhistory_img"
            />
            <Box
              component="span"
              sx={{
                width: '405px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F2F2F2',
              }}
            >
              <ImgView src={''} alt={''} crossOrigin="anonymous" />
            </Box>
          </MeetingSection>
          <MeetingSection>
            <h2>Contents</h2>
            <OutlinedInput minRows={6} multiline value={''} placeholder={'Enter your text here'} onChange={() => {}} />
          </MeetingSection>
          <Button
            type={'submit'}
            variant={'contained'}
            sx={{
              width: '150px',
              height: '28px',
              alignSelf: 'center',
              borderRadius: '1rem',
              font: 'normal normal normal 14px/26px NanumSquareOTF',
              textTransform: 'none',
            }}
          >
            Submit
          </Button>
        </form>
      </ContainerBlock>
    </>
  )
}

export default ConferenceWrite

const ImgView = styled.img`
  width: 255px;
  height: 170px;
  border: 1px solid #ddd;
`
