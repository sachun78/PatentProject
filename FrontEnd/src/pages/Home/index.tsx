import { css } from '@emotion/react'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { Stack, ToggleButton } from '@mui/material'
import Post from 'components/Post/'
import SearchBox from 'components/SearchBox'
import usePostQuery from 'hooks/query/usePostQuery'
import { getPosts, getPostsSearch } from 'lib/api/post/getPosts'
import { IPost } from 'lib/api/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import FilterArea from './filter/FilterArea'
import FilterCard from './filter/FilterCard'
import PostForm from './form/PostForm'

type HomeProps = {}

function Home({}: HomeProps) {  
  const [filter, setFilter] = useState(false)

  const { ref, inView } = useInView()
  const [searchText, setSearchText] = useState('')
  const [search, setSearch] = useState(false)  
  const onSearchMode = useCallback(() => {
    setSearch((prev) => !prev)
    setSearchText('')
  }, [setSearch])   

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['posts'],
    ({ pageParam = 0 }) => getPosts(pageParam),
    {      
      getNextPageParam: (lastPage, pages) => {
        
        const morePagesExist = lastPage.length === 5        
        if (!morePagesExist) return false
        return pages.flat().length
      }      
    }    
  )      
  

  const { data: searchData } = useQuery(['posts_search', searchText], () => getPostsSearch(searchText), {
    enabled: !!searchText,
  })      

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
      <div css={searchBoxStyle}>
        {search && 
        <SearchBox filter={setSearchText} post={true} />}
        <ToggleButton
          value="check"
          selected={search}
          onChange={onSearchMode}
          color={'primary'}
          sx={{ borderRadius: '1rem', border: 'none' }}
        >
          {!search ? <SearchIcon /> : <SearchOffIcon />}
        </ToggleButton>
        <FilterCard onFilter={onFilter} />                
      </div>
      <Stack>        
        {filter && <FilterArea />}  
        <Link css={linkStyle} to={'/postWrite/'} state={{}}>
          <PostForm />
        </Link>
        {searchData && searchData?.map((search: IPost) => (
          <div key={search._id} css={postViewStyle}>
            <Post 
              key={search._id}
              _id={search._id}
              owner_username={search.owner_username}
              owner_email={search.owner_email}
              owner_id={search.owner_id}
              like_cnt={search.like_cnt}
              contents={search.contents}
              comment={search.comment}
              images={search.images}
              createdAt={search.createdAt}
            />
          </div> 
        ))}         
        {!searchData && posts?.map((post: IPost) => (
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

const searchBoxStyle = css`
  position: fixed;
  display: flex;  
  max-width: 54.375rem;
  width: 54.375rem;
  min-height: 2rem;
  margin-top: 2.5rem;  
  margin-bottom: 0.5rem;
  top: -1px;        
  flex-direction: row;  
  justify-content: flex-end;
  z-index: 999;
`

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
