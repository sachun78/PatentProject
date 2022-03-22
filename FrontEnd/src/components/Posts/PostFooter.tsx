import { css } from '@emotion/react'
import { MdRecommend,MdOutlineModeComment } from 'react-icons/md'
import palette from '../../lib/palette'

export type PostFooterProps = {}

function PostFooter({}: PostFooterProps) {
  return <div css={footerStyle}>
    <div css={countWrapper}>comment, likes</div>
    <div css={buttonWrapper}>
      <div className={'toolbar'}>
        <div className={'item'}>
          <div className={'icon'}><MdRecommend /></div>
          <div className={'text'}>Recommend</div>
        </div>
        <div className={'item'}>
          <div className={'icon'}><MdOutlineModeComment /></div>
          <div className={'text'}>Comment</div></div>
      </div>
    </div>
  </div>
}

const footerStyle = css`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  line-height: 1.34;
`
const countWrapper = css`
  padding-bottom: 10px;
  margin-right: 16px;
  margin-left: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 1.3333;
  border-bottom: 1px solid #CED0E4;
`
const buttonWrapper = css`
  margin-right: 1.2rem;
  margin-left: 1.2rem;

  .toolbar {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: stretch;
    padding: 4px;
    margin: 2px -2px 2px;
    flex-wrap: nowrap;
    flex-shrink: 0;
  }
  
  .item {
    flex-basis: 0;
    height: 4.4rem;
    justify-content: center;
    display: flex;
    flex-shrink: 1;
    flex-grow: 1;
    flex-wrap: nowrap;
    padding: 6px 2px 6px;
    white-space: nowrap;
    align-items: center;
    border-radius: 4px;
    .icon {
      padding: 6px 4px 1px;
      position: relative;
      max-width: 100%;
    }
    .text {
      padding: 6px 4px 6px;
      min-width: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: ${palette.purple[400]};
    }
    svg {
      width: 1.8rem;
      height: 1.8rem;
      color: ${palette.purple[400]};
    }

    &:hover {
      background: ${palette.purple[50]};
    }
  }
`

export default PostFooter
