import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CardItem, CardSection, Footer, Header, MainSection, Section1 } from './styles'

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
      <section style={{ width: '100%', height: '100px' }}></section>
      <Section1>
        <img src={'/assets/wemet_logo.png'} alt={'logo'} className={'main-logo'} />
        <h1>
          <span>We Met for IP</span> and we want to <span>Meet for IP</span>.
        </h1>
        <h2>
          We will provide the tools. All you need to do is <span>We Met for IP!</span>
        </h2>
        <MainSection>
          <div className={'large-block'}></div>
          <img src={'/assets/landing-meeting.png'} />
          <div className={'text-block'}>
            <p className={'contents'}>
              <b>We Met for IP</b> will make your meeting scheduling task much easier for everybody in the IP industry.
              All you need to do is provide the name and e-mail of the person you want to schedule a meeting.{' '}
              <b>We Met for IP</b> will send the meeting invite, track date, time and place you will meet during an IP
              event. <b>We Met for IP</b> will keep the history of the meeting so you know exactly where and when you
              met each other. <b>We Met for IP</b> also provide a playground for all the people in the IP industry so
              you can share precious memories and bring the IP community closer to each other.
            </p>
          </div>
          <div className={'small-block'}></div>
        </MainSection>
        <CardSection>
          <CardItem>
            All you need for meeting is We&nbsp;<span>Met for IP</span>
          </CardItem>
          <CardItem>
            All you need for meeting is We&nbsp;<span>Met for IP</span>
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
