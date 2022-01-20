import { Link } from 'react-router-dom'
import useSelectMenu from '../../hooks/useSelectMenu'
import { css } from '@emotion/react'
import palette from '../../lib/palette'

type LogoProps = {}

function Logo({}: LogoProps) {
  const { setCurrent } = useSelectMenu()

  const handleClick = () => {
    setCurrent('main')
  }

  return (
    <div css={warpper}>
      <div css={logoStyle}>
        <nav onClick={handleClick}>
          <Link to='/'>
            <div>WEMET</div>
          </Link>
        </nav>
      </div>
      <div css={subLogoStlye}>
        <div className='align-self'>
          <span>Home</span>
        </div>
      </div>
    </div>
  )
}

const warpper = css`
  display: flex;
`
const subLogoStlye = css`
  padding-right: 1rem;
  padding-left: 1rem;

  .align-self {
    align-self: center;
    height: 100%;
    display: flex;

    span {
      text-align: center;
      align-items: center;
      user-select: none;
      display: flex;
      line-height: 1.4;
      font-weight: 600;
      font-size: 1.4rem;
      color: ${palette.blue[600]};
    }
  }
`
const logoStyle = css`
  height: 100%;
  padding-left: 1.5rem;
  padding-right: 1rem;

  nav {
    align-self: center;
    height: 100%;
    display: flex;
  }

  a {
    text-align: center;
    align-items: center;
    user-select: none;
    display: flex;
    text-decoration: none;

    div {
      line-height: 1.2;
      color: #0e0e10;
      font-weight: 700;
      font-size: 1.6rem;

      &:hover {
        color: ${palette.blueGrey[600]};
      }
    }
  }
`

export default Logo
