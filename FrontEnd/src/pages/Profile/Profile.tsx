import { css } from '@emotion/react'
import InfoView from '../../components/InfoView'

export type ProfileProps = {}

function Profile({}: ProfileProps) {
  return <div css={wrapper}>
    <div css={titleStyle}>
      <div className='line'>
        <h2>Profile</h2>
      </div>
    </div>
    <div css={infoStyle}><InfoView /></div>
  </div>
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`
const titleStyle = css`
  padding-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;

  h2 {
    line-height: 1.2;
    font-size: 3.6rem;
    font-weight: 700;
    padding-bottom: 1rem;
  }

  .line {
    box-shadow: inset 0 calc(-1 * 1px) 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
`
const infoStyle = css`
  padding-left: 3rem;
  padding-right: 3rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
`

export default Profile
