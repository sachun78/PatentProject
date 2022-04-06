import { css } from '@emotion/react'
import palette, { brandColor } from '../../lib/palette'

export type PostFooterProps = {}

function PostFooter({}: PostFooterProps) {
  return <div css={footerStyle /*flex*/}>
    <div css={buttonWrapper}>
      <div className={'toolbar'}>
        <div className={'item'}>
          <div className={'text'}>Good</div>
        </div>
        <div className={'item'}>
          <div className={'text'}>Detail</div>
        </div>
      </div>
    </div>
    <div css={countWrapper}>likes</div>
  </div>
}

const footerStyle = css`
  display: flex;
  margin: 2rem 1.875rem 0;
`
const countWrapper = css`
  padding-bottom: 10px;
  margin-right: 16px;
  margin-left: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const buttonWrapper = css`
  flex: 1;

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
    height: 1.875rem;
    justify-content: center;
    display: flex;
    flex-shrink: 1;
    flex-grow: 1;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    border-radius: 11px;
    background: ${brandColor};
    margin-right: 10px;
    
    .text {
      font: normal normal 800 14px/19px NanumSquareOTF;
      color: #fff;
    }

    svg {
      width: 1.8rem;
      height: 1.8rem;
      color: ${palette.purple[400]};
    }
  }
`

export default PostFooter
