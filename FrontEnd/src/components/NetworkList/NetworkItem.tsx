import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'
import { IProfile } from 'lib/api/types'
import { useNavigate } from 'react-router-dom'

export type NetworkItemProps = {
  data: { email: string, profile: IProfile }
}

function NetworkItem({ data }: NetworkItemProps) {
  const navigate = useNavigate()
  return <div css={itemStyle} onClick={() => navigate('/u/' + data.email)}>
    <div css={iconStyle}><img src={'https://blog.kakaocdn.net/dn/wn8ds/btq5u4RsTuG/7KMKUbqv3CLSbdigBxxnJ0/img.png'}
                              alt={'user-icon'} />
    </div>
    <div css={nameStyle}>{data.email}</div>
    <div
      css={informStyle}>COMPANY {data.profile.company} FIELD: {data.profile.field?.map((item) => item)} country:{data.profile.country}</div>
    <div css={stateStyle}>
      <span>something online?</span>
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
    border: 2px solid ${brandColor};
    color: ${brandColor};
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
