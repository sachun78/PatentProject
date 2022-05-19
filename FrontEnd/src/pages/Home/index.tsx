import { css } from '@emotion/react'
import AddIcon from '@mui/icons-material/Add'
import { Fab, Stack, ToggleButton } from '@mui/material'
import IconControl from 'components/IconControl'
import { searchIcon } from 'components/IconControl/svg'
import Post from 'components/Post/'
import SearchBox from 'components/SearchBox'
import { getPosts, getPostsSearch } from 'lib/api/post/getPosts'
import { IPost } from 'lib/api/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import FilterArea from './filter/FilterArea'
import FilterCard from './filter/FilterCard'

type HomeProps = {}

function Home({}: HomeProps) {  
  const [filter, setFilter] = useState(false)

  const { ref, inView } = useInView()
  const [searchText, setSearchText] = useState('')
  const [changeColor, setChangecolor] = useState(false)
  const [filterOn, setFilterOn] = useState(false);
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

  const onFocus = () => {    
    setFilterOn(true)        
  }

  const onBlur = () => {
    setFilterOn(false)
  }
  
  return (
    <>                   
      <Stack>
      <div css={searchBoxStyle}>
        <div css={nationStyle} onFocus={onFocus} onBlur={onBlur} tabIndex={1}>
          <img src="/assets/country.png" alt={'country'} style={{ width: "1rem", height: "1rem", marginRight: "0.3125rem" }} />
          <div>Nation</div>
          {/* {filterOn &&}  */}
          
          <FilterArea />
          
        </div>                
        <SearchBox filter={setSearchText} post={true} />                
      </div>                 
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
      <Link css={linkStyle} to={'/postWrite/'}>
        <Fab sx={{ position: 'fixed', bottom: 103, right: '1.025rem', zIndex: 10 }} color="primary" >
          <AddIcon />
        </Fab>
      </Link>    
    </>     
  )
}

const nationStyle = css`
  padding: 0.5rem 0.75rem;
  border: 1px solid #910457;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;   

  input {
    width: 12.5rem;
    height: 1.375rem;
  }

  input::placeholder {
    color: #D9D9D9;
  }

  input:focus {
    outline: none;
  }
`

const searchBoxStyle = css`
  position: relative;
  display: flex;  
  max-width: 54.375rem;
  width: 54.375rem;
  height: 2rem;        
  margin-bottom: 1.5rem;   
  flex-direction: row;  
  justify-content: space-between;
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
