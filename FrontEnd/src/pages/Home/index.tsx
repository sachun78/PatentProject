import { css } from '@emotion/react'
import { Stack } from '@mui/material'
import Post from 'components/Post/'
import usePostQuery from 'hooks/query/usePostQuery'
import { IPost } from 'lib/api/types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FilterArea from './filter/FilterArea'
import FilterCard from './filter/FilterCard'
import PostForm from './form/PostForm'

type HomeProps = {}

function Home({}: HomeProps) {
  const { data: posts, isLoading } = usePostQuery()
  const [filter, setFilter] = useState(false)

  if (isLoading) return <div>로딩중!!</div>

  const onFilter = (value: boolean) => {
    setFilter(!filter)
  }

  return (
    <>
      <Stack>
        <FilterCard onFilter={onFilter} />
        {filter && <FilterArea />}
        
        <Link css={linkStyle} to={'/postWrite/'} state={{}}>
          <PostForm />
        </Link>      
        
        <div css={postViewStyle}>
          {posts?.map((post: IPost) => (            
            <Post
              key={post._id}
              _id={post._id}
              owner_username={post.owner_username}
              owner_thumb={post.owner_thumb}
              owner_id={post.owner_id}
              like_cnt={post.like_cnt}
              contents={post.contents}
              comment={post.comment}
              images={post.images}
              createdAt={post.createdAt}
            />            
          ))}
        </div>
      </Stack>
    </>
  )
}

const postViewStyle = css`
  max-width: 54.375rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const linkStyle = css`
  text-decoration: none;

  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    cursor: pointer;
  }
`
export default Home
