import React from 'react'
import { css } from '@emotion/react'
import InitialInputModal from 'components/InitialInputModal'
import Post from 'components/Post/'
import { Card, Grid } from '@mui/material'
import { brandColor } from '../../lib/palette'

type HomeProps = {}

function Home({}: HomeProps) {
  return <>
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ ml: 0 }}>
      <Card variant='outlined'
            sx={{
              p: 2.25, width: '54.375rem', mb: 2, boxShadow: '0 3px 6px #00000029',
              borderRadius: '1rem', cursor: 'pointer',
              '&:hover': {
                background: brandColor, color: '#fff'
              }
            }}> +
        Create new Post</Card>
      <div css={postViewStyle}>
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
  max-width: 54.375rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default Home
