import { css } from '@emotion/react'
import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

type PostProps = {
  id?: string
  contents?: string
}

function Post({ id, contents }: PostProps) {
  return (
    <div css={postStyle}>
      <PostHeader />
      <div css={bodyStlye}>앱 개발자, 데이터 사이언티스트, 엔지니어를 위한 2022년 최신 AI/ML 무료 교육에 초대합니다! 한국어 자연어 처리를 고민하고 계신가요? 수요 예측을 위한 시계열
        예측 모델이 필요하신가요? AWS가 제공하는 다양한 기능을 이용해 보다 쉽고 빠르게 머신러닝 모델을 업무에 적용하는 방법을 배워보세요!
      </div>
      <PostFooter />
    </div>
  )
}

const postStyle = css`
  width: 68rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-bottom: 1.6rem;
  line-height: 1.34;
  font-size: 1.2rem;
  border-radius: max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
`
const bodyStlye = css`
  padding: 4px 16px 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 20px;
`

export default Post
