import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import Post from './Post'
import palette from '../../lib/palette'
import { PostValue, usePostView } from '../../hooks/usePostView'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

type PostViewProps = {}

function PostView({}: PostViewProps) {
  const {list, error, loading}  = usePostView();
  const [dataSource, setDataSourece] = useState<PostValue[] | undefined>();

  useEffect(()=> {
    const loadData = async()=> {
      const data: PostValue[] | undefined = await list('ryan4321@naver.com')
      setDataSourece(data)
   }
    loadData();
  }, [])

  if(dataSource === undefined){
    return (<div>loading ~~~~ </div>)
  }

  return (
    <div css={postViewStyle}>
      <div css={sortButtonStyle}>
        <span>Sorting Option</span>
        <Button css={growStyle}>Country</Button>
        <Button css={growStyle}>Field</Button>
        <Button css={growStyle}>My Acquaintance</Button>
        <Button css={growStyle} >
          <Link to={'/search'}>검색</Link>
        </Button>
      </div>
    {     dataSource.map((data)=> {
      return <Post key={data._id.toString()} id={data.email.toString()} contents={data.postmessage.toString()} />
    })}

    </div>
  )

}

const postViewStyle = css`
  height: 100%;
  background: ${palette.grey[50]};
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
  padding-top: 1rem;
  .post + .post {
    margin-top: 0.5rem;
  }
`

const sortButtonStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 5rem;

  a {
    text-decoration: none;
    color: black;
  }
  > span {
    font-size: 1rem;
    margin-right: 0.5rem;
    font-weight: bold;
    width: 3.5rem;
    line-height: 1rem;
    background: whitesmoke;
    flex-grow: 1;
    text-align: center;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-radius: 0.5rem;
    user-select: none;
  }
`

const growStyle = css`
  flex-grow: 1;
`

export default PostView
