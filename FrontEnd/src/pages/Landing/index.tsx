import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CardItem, CardSection, Footer, Header, Section1 } from './styles'

export type LandingProps = {}

function Landing({}: LandingProps) {
  const navigation = useNavigate()

  return (
    <>
      <Header>
        <div className={'logo'}>
          <img src={'/assets/wemet_logo_mini.png'} alt={'logo'} />
        </div>
        <ul>
          <li>
            <button onClick={() => navigation('/login')} className={'btn-login'}>
              Login
            </button>
          </li>
          <li className={'skip'}>
            <button onClick={() => navigation('/email/check')}>Get started</button>
          </li>
        </ul>
      </Header>
      <Section1>
        <img src={'/assets/wemet_logo.png'} alt={'logo'} className={'main-logo'} />
        <h1>
          We bring people <span>together</span>. You make the <span>magic</span> happen.
        </h1>
        <p className={'contents'}>
          Calendly takes the busywork of scheduling off your to-do list so you can get more done. thousands of teams
          across the globe use calendly to make millions of 1-click meetings every week. coordinate, connect, and
          nurture relationships all in one meeting lifecycle platform.
        </p>
        <CardSection>
          <CardItem>
            <img src={'/assets/rending_meeting.png'} />
            <div>SCHEDULING PLATFORM</div>
          </CardItem>
          <CardItem>
            <img src={'/assets/rending_meeting2.png'} />
            <div>SCHEDULING PLATFORM</div>
          </CardItem>
          <CardItem>
            <img src={'/assets/rending_meeting.png'} />
            <div>SCHEDULING PLATFORM</div>
          </CardItem>
          <CardItem>
            <img src={'/assets/rending_meeting2.png'} />
            <div>SCHEDULING PLATFORM</div>
          </CardItem>
        </CardSection>
        <Footer>
          <span>sponsor</span>
          <img src={'/assets/logo-hanyang.png'} className={'sungam'} />
          <img src={'/assets/logo-sungam.png'} className={'sungam'} />
          <img src={'/assets/logo-cisun.png'} className={'cisun'} />
          <img src={'/assets/logo-hanyang.png'} className={'sungam'} />
          <img src={'/assets/logo-sungam.png'} className={'sungam'} />
          <img src={'/assets/logo-cisun.png'} className={'cisun'} />
          <img src={'/assets/logo-hanyang.png'} className={'sungam'} />
        </Footer>
      </Section1>
    </>
  )
}

export default Landing
