import React from 'react'
import { css } from '@emotion/react'
import InitialInputModal from 'components/InitialInputModal'
import Post from 'components/Post/'
import { Stack } from '@mui/material'
import PostForm from './form/PostForm'
import usePostQuery from 'hooks/query/usePostQuery'

type HomeProps = {}

function Home({}: HomeProps) {
  const { data, isLoading } = usePostQuery()
  return <>
    <Stack>
      <PostForm />
      <div css={postViewStyle}>
        {data?.map((post: any) =>
        <Post 
          key={post.id}
          id={post.id}                    
          text={post.text}
          like={post.like}
          comments={post.comments}
          writer={post.writer}
          created_at={post.created_at.toDateString()}
        />
        )}        
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
