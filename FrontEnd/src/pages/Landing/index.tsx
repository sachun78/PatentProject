import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header, Section1 } from './styles'

export type LandingProps = {}

function Landing({}: LandingProps) {
  const navigation = useNavigate()

  return (
    <>
      <Header>
        <div className={'logo'}>
          <img src={'/assets/wemet_logo.png'} alt={'logo'} />
        </div>
        <ul>
          <li>
            <Link to={'/login'}>Login</Link>
          </li>
          <li className={'skip'}>
            <button onClick={() => navigation('/email/check')}>Get started</button>
          </li>
        </ul>
      </Header>
      <section style={{ width: '100%', height: '104px' }}></section>
      <Section1>
        <p>ABOUT US</p>
        <h1>
          We bring people <span>together</span>. You make the <span>magic</span> happen.
        </h1>
        <p className={'contents'}>
          Calendly takes the busywork of scheduling off your to-do list so you can get more done. Thousands of teams
          across the globe use Calendly to make millions of 1-click meetings every week. Coordinate, connect, and
          nurture relationships all in one meeting lifecycle platform.
        </p>
      </Section1>
      <Section1>
        <h2>We're the #1 scheduling platform</h2>
      </Section1>
      <Section1>
        <h2>We're the #1 scheduling platform</h2>
      </Section1>
      <Section1>
        <h2>We're the #1 scheduling platform</h2>
      </Section1>
      <Section1>
        <h2>We're the #1 scheduling platform</h2>
      </Section1>
    </>
  )
}

export default Landing
