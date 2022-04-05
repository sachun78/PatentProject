import React from 'react'
import { css } from '@emotion/react'
import InitialInputModal from 'components/InitialInputModal'
import Post from 'components/Post/'
import media from 'lib/styles/media'
import { Card, Grid } from '@mui/material'

type HomeProps = {}

function Home({}: HomeProps) {
  return <>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Card variant='outlined' sx={{ p: 2.25, width: '1088px', mb: 2 }}> + Create new Post</Card>
      <div css={postViewStyle}>
        {/*  POST BLOCK */}
        <Post id='1' />
        <Post id='2' />
        <Post id='3' />
        <Post id='4' />
      </div>
    </Grid>
    <InitialInputModal />
  </>
}

const postViewStyle = css`
  min-height: calc(100vh - 7rem);
  max-width: 68rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${media.small} {
    margin-right: 0;
  }
`

export default Home
