import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import Post from './Post'
import palette from '../../lib/palette'
import { PostValue, usePostView } from '../../hooks/usePostView'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

type PostViewProps = {}

function Posts({}: PostViewProps) {
  const { list, error, loading } = usePostView()
  const [dataSource, setDataSourece] = useState<PostValue[] | undefined>()

  useEffect(() => {
    const loadData = async () => {
      const data: PostValue[] | undefined = await list('ryan4321@naver.com')
      setDataSourece(data)
    }
    loadData()
  }, [])

  if (dataSource === undefined) {
    return (<div>loading ~~~~ </div>)
  }

  return (
    <div css={postViewStyle}>
      <div >
        노출할 포스트 타입 선택기
      </div>
      {dataSource.map((data) => {
        return <Post key={data._id.toString()} id={data.email.toString()} contents={data.postmessage.toString()} />
      })}

    </div>
  )

}

const postViewStyle = css`
  height: 100%;
  background: #fff;
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
  padding-top: 1rem;
`

const growStyle = css`
  flex-grow: 1;
`

export default Posts
