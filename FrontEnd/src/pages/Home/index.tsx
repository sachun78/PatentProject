import { css } from '@emotion/react'
import { Stack } from '@mui/material'
import Post from 'components/Post/'
import { getPosts } from 'lib/api/post/getPosts'
import { IPost } from 'lib/api/types'
import React, { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { Link } from 'react-router-dom'
import FilterArea from './filter/FilterArea'
import FilterCard from './filter/FilterCard'
import PostForm from './form/PostForm'

type HomeProps = {}

function Home({}: HomeProps) {  
  const [filter, setFilter] = useState(false)

  const { ref, inView } = useInView()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['posts'],
    ({ pageParam = 0 }) => getPosts(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        
        const morePagesExist = lastPage.length === 5        
        if (!morePagesExist) return false
        return pages.flat().length
      },
    }
  )

  useEffect(() => {
    if(!data) return;

    if (hasNextPage && inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const posts = useMemo(() => {
    if (!data) return []
    return data.pages.flat().filter((post) => {
      return !post.history
    })
  }, [data])


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
        {posts?.map((post: IPost) => (
          <div key={post._id} css={postViewStyle} ref={ref}>    
          <Post
            key={post._id}
            _id={post._id}
            owner_username={post.owner_username}
            owner_email={post.owner_email}
            owner_id={post.owner_id}
            like_cnt={post.like_cnt}
            contents={post.contents}
            comment={post.comment}
            images={post.images}
            createdAt={post.createdAt}              
          />
          </div>    
        ))}        
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
