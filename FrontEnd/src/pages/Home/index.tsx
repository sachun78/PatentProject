import React from 'react'
import { css } from '@emotion/react'
import InitialInputModal from 'components/InitialInputModal'
import Post from 'components/Post/'
import { Stack } from '@mui/material'
import PostForm from './form/PostForm'

type HomeProps = {}

function Home({}: HomeProps) {
  return <>
    <Stack>
      <PostForm />
      <div css={postViewStyle}>
        <Post id='1' />
        <Post id='2' />
        <Post id='3' />
        <Post id='4' />
      </div>
    </Stack>
    {/* 임시 주석처리 */}
    {/* <InitialInputModal /> */}
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
