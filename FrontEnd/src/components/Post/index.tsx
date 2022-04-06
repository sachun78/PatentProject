import { css } from '@emotion/react'
import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import media from '../../lib/styles/media'

type PostProps = {
  id?: string
  contents?: string
}

function Post({ id, contents }: PostProps) {
  return (
    <div css={postStyle}>
      <PostHeader />
      <figure><img src={'https://picsum.photos/200/300?random=' + id} alt={'post-img'} /></figure>
      <div css={bodyStyle}>{contents
        ? contents
        : `앱 개발자, 데이터 사이언티스트, 엔지니어를 위한 2022년 최신 AI/ML 무료 교육에 초대합니다! 한국어 자연어 처리를 고민하고 계신가요? 수요 예측을 위한 시계열
        예측 모델이 필요하신가요? AWS가 제공하는 다양한 기능을 이용해 보다 쉽고 빠르게 머신러닝 모델을 업무에 적용하는 방법을 배워보세요!`}
      </div>
      <PostFooter />
    </div>
  )
}

const postStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
  background: #fff;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 1rem;
  position: relative;

  figure {
    max-height: 40rem;
    display: flex;
    justify-content: center;
    background: grey;
    margin: 1.25rem 1.875rem;
  }
  ${media.small} {
    margin-right: 1rem;
    //padding-left: 0;
  }
`
const bodyStyle = css`
  padding: 0 1.875rem;
  font: normal normal 800 14px/19px NanumSquareOTF;
`

export default Post
