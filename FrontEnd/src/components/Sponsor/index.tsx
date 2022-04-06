import { bodyStyle } from './styles'

export type SponsorProps = {}

function Sponsor({}: SponsorProps) {
  return <div css={bodyStyle}>
    <span>SPONSOR</span>
    <div className={'sponsors'}>
      <img src={'/assets/logo.png'} alt={'logo'}/>
      <img src={'/assets/logo.png'} alt={'logo'}/>
      <img src={'/assets/logo.png'} alt={'logo'}/>
      <img src={'/assets/logo.png'} alt={'logo'}/>
      <img src={'/assets/logo.png'} alt={'logo'}/>
      <img src={'/assets/logo.png'} alt={'logo'}/>
      <img src={'/assets/logo.png'} alt={'logo'}/>
    </div>
  </div>
}

export default Sponsor
