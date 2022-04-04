import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type NetworkItemProps = {}

function NetworkItem({}: NetworkItemProps) {
  return <div css={itemStyle}>
    <div css={iconStyle}><img src={'https://blog.kakaocdn.net/dn/wn8ds/btq5u4RsTuG/7KMKUbqv3CLSbdigBxxnJ0/img.png'} alt={'user-icon'} />
    </div>
    <div css={nameStyle}>NAME</div>
    <div css={informStyle}>Company, favoriteField</div>
    <div css={stateStyle}>
      <div className={'request-block'}>
        <span>request to: n</span>
        <span>request from: n</span>
      </div>
      <span>something</span>
    </div>
  </div>
}

const itemStyle = css`
  display: flex;
  width: 100%;
  height: 8rem;
  align-items: center;
  background: #fff;
  border-radius: 0.8rem;
  line-height: 1.5;

  &:hover {
    border: 2px solid ${palette.purple[400]};
    color: ${palette.purple[400]};
  }

  & + & {
    margin-top: 1rem;
  }
`
const iconStyle = css`
  margin-right: 1rem;
  margin-left: 1rem;
  padding: 0.5rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 1px solid grey;
    user-select: none;
  }
`
const nameStyle = css`
  margin-right: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
`

const informStyle = css`
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`
const stateStyle = css`
  display: flex;
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  flex-grow: 1;
  text-align: right;
  justify-content: flex-end;

  span + span {
    margin-left: 1rem;
  }

  .request-block {
    margin-right: 1rem;
  }
`

export default NetworkItem
