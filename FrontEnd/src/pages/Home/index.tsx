import { css } from '@emotion/react'
import { Stack } from '@mui/material'
import Post from 'components/Post/'
import usePostQuery from 'hooks/query/usePostQuery'
import { IPost } from 'lib/api/types'
import React from 'react'
import { Link } from 'react-router-dom'
import PostForm from './form/PostForm'

type HomeProps = {}

function Home({}: HomeProps) {
  const { data, isLoading } = usePostQuery()
  return <>
    <Stack>
      <Link css={linkStyle} to={'/postWrite/'}
        state={{
        }}
      > 
        <PostForm />
      </Link>
      <div css={postViewStyle}>
        {data?.map((post: IPost) =>
        <Post 
          key={post.id}
          id={post.id}                    
          text={post.text}
          like={post.like}
          comments={post.comments}
          writer={post.writer}
          created_at={post.created_at}          
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
const linkStyle = css`
  a {
    text-decoration: none;
    text-decoration-line: none;
  }
  a:link, a:visited, a:hover {
      text-decoration: none;
      cursor: pointer;
  }
`
export default Home