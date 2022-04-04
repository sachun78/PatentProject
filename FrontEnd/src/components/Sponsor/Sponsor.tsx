import { css } from '@emotion/react'
import IconControl from '../IconControl'
import palette from '../../lib/palette'

export type SponsorProps = {}

function Sponsor({}: SponsorProps) {
  return <div css={bodyStyle}>
    <div className={'sponsors'}>
      <IconControl name={'plus'} />
      <IconControl name={'plus'} />
      <IconControl name={'plus'} />
      <IconControl name={'plus'} />
      <IconControl name={'links'} />
    </div>
  </div>
}

const bodyStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  
  h2 {
    font-size: 1.25rem;
    line-height: 1.4;
    text-align: center;
    color: #fff;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .sponsors {
    padding-top: 0.4rem;
    flex: 3;
    display: flex;
    justify-content: space-around;
    margin-right: 2rem;

    svg {
      width: 2.4rem;
      height: 2.4rem;
      color: ${palette.purple[900]};
    }
  }
`

export default Sponsor
