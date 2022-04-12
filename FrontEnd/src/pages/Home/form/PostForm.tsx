import { css } from '@emotion/react'
import { BsCardImage } from 'react-icons/bs'

export type PostFormProps = {}

function PostForm({}: PostFormProps) {
  return <div css={containerStyle}>
    <h1>Post Something</h1>
    <div className={'divider'}>{''}</div>
    <div className={'input-post'}>
      <span>+ What's on your mind?</span>
      <BsCardImage />
    </div>
  </div>
}

const containerStyle = css`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  box-shadow: 0 3px 6px #00000029;

  max-width: 54.375rem;
  min-height: 9.25rem;

  margin-bottom: 1.25rem;
  padding: 1.875rem;

  h1 {
    margin: 0;
    color: #333;
    font: normal normal 800 18px NanumSquareOTF;
    line-height: 1.166666667;
  }

  .divider {
    margin-top: 1.25rem;
    margin-bottom: 1.875rem;
    border: 1px solid #9C9C9C;
  }

  .input-post {
    display: flex;

    span {
      flex: 1;
      color: #9C9C9C;
    }

    svg {
      width: 18px;
      height: 18px;
      fill: #9C9C9C;
    }
  }
`

export default PostForm
