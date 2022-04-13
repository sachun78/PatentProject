import { bodyStyle } from './styles'

export type SponsorProps = {}

function Sponsor({}: SponsorProps) {
  return <div css={bodyStyle}>
    <span>SPONSOR</span>
    <div className={'sponsors'}>
      <img src={'/assets/logo-hanyang.png'} alt={'logo'} />
      <img src={'/assets/logo-sungam.png'} alt={'logo'} />
      <img src={'/assets/logo-cisun.png'} alt={'logo'} />
      <img src={'/assets/logo-hanyang.png'} alt={'logo'} />
      <img src={'/assets/logo-sungam.png'} alt={'logo'} />
      <img src={'/assets/logo-cisun.png'} alt={'logo'} />
      <img src={'/assets/logo-hanyang.png'} alt={'logo'} />
    </div>
    <div className={'space'} />
  </div>
}

export default Sponsor
