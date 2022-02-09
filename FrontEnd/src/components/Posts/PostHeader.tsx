import { css } from '@emotion/react'
import { MdAir, MdMoreHoriz } from 'react-icons/md'
import palette from '../../lib/palette'

export type PostHeaderProps = {}

function PostHeader({}: PostHeaderProps) {
  const onMoreClick = () => {
    alert('this is more btn!')
  }

  return <div css={headerStyle}>
    <div css={iconStyle}><MdAir /></div>
    <div css={titleStyle}><h4>
      <span>TitleTitle</span>
    </h4>
      <div>posted time-date</div>
    </div>
    <div css={moreStyle} onClick={onMoreClick}><MdMoreHoriz /></div>
  </div>
}

const headerStyle = css`
  display: flex;
  padding-top: 1.2rem;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  margin-bottom: 1.2rem;
  align-items: flex-start;
`
const moreStyle = css`
  width: 3.6rem;
  height: 3.6rem;
  padding: 0.8rem;
  border-radius: 9999px;

  &:hover {
    background: ${palette.blueGrey[50]};
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

`
const titleStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  margin-bottom: -5px;

  h4 {
    margin-top: 4px;
    outline: none;
    text-align: left;
  }

  span {
    font-weight: 600;
    font-size: 1.5rem;
  }
`
const iconStyle = css`
  margin-right: 0.8rem;

  svg {
    width: 4rem;
    height: 4rem;
    border-radius: 9999px;
  }
`

export default PostHeader
