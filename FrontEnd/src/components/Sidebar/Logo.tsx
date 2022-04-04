import { Link, NavLink } from 'react-router-dom'
import { css } from '@emotion/react'
import palette from '../../lib/palette'

type LogoProps = {}

function Logo({}: LogoProps) {

  return (
    <div css={wrapper}>
      <div css={logoStyle}>
          <NavLink to='/'>
            <div>WEMET</div>
          </NavLink>
      </div>
    </div>
  )
}

const wrapper = css`
  display: flex;
`

const logoStyle = css`
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 1rem;
  align-self: center;
  display: flex;
  
  a {
    text-align: center;
    align-items: center;
    user-select: none;
    display: flex;
    text-decoration: none;

    div {
      line-height: 1.2;
      color: ${palette.purple[600]};
      font-weight: 700;
      font-size: 1.8rem;

      &:hover {
        color: ${palette.purple[400]};
      }
    }
  }
`

export default Logo
