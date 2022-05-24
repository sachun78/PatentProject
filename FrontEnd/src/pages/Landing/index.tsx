import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CardItem, CardSection, Footer, Header, Section1 } from './styles'
import IconControl from '../../components/IconControl'
import { css } from '@emotion/react'

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
          <span>We Met for IP</span> and we want to <span>We Met for IP</span>. We will provide the tools. All you need
          to do is <span>We Met for IP</span>!
        </h1>
        <p className={'contents'}>
          <b>We Met for IP</b> will make your meeting scheduling task mush easier for everybody in the IP industy. All
          you need to do is provide the name and e-mail of the person you want to schedule a meeting.{' '}
          <b>We Met for IP</b> will send the meeting invite, track date, time and place you will meet during an IP
          event.<b>We Met for IP</b> will keep the history of the meeting so you know exactly where and when you met
          each other.<b>We Met for IP</b> also provide a playground for all the people in the IP industry so you can
          share precious memories and bring the IP community closer to each other.
        </p>
        <CardSection>
          <CardItem>
            <img src={'/assets/rending_meeting.png'} />
            <div>
              <div css={dateIcon}>
                <IconControl name={'dateSelect'} />
              </div>
              <h4>SCHEDULING PLATFORM</h4>
              <p>
                All you need for meeting is <b>We Met for IP</b>.
              </p>
            </div>
          </CardItem>
          <CardItem>
            <img src={'/assets/rending_meeting2.png'} />
            <div>
              <div css={dateIcon}>
                <IconControl name={'dateSelect'} />
              </div>
              <h4>SCHEDULING PLATFORM</h4>
              <p>
                All you need for meeting is <b>We Met for IP</b>.
              </p>
            </div>
          </CardItem>
          <CardItem>
            <img src={'/assets/rending_meeting.png'} />
            <div>
              <div css={dateIcon}>
                <IconControl name={'dateSelect'} />
              </div>
              <h4>SCHEDULING PLATFORM</h4>
              <p>
                All you need for meeting is <b>We Met for IP</b>.
              </p>
            </div>
          </CardItem>
          <CardItem>
            <img src={'/assets/rending_meeting2.png'} />
            <div>
              <div css={dateIcon}>
                <IconControl name={'dateSelect'} />
              </div>
              <h4>SCHEDULING PLATFORM</h4>
              <p>
                All you need for meeting is <b>We Met for IP</b>.
              </p>
            </div>
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

const dateIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #6c6c6c;
  box-shadow: 2px 5px 11px #00000029;
  border-radius: 100%;
  position: relative;
  top: -50px;
  margin: 0 auto;
`

export default Landing
