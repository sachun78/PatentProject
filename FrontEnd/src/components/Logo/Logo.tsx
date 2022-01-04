import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import useSelectMenu from '../../hooks/useSelectMenu'

type LogoProps = {}

function Logo({}: LogoProps) {
  const { setCurrent } = useSelectMenu()

  const handleClick = () => {
    setCurrent('main')
  }

  return (
    <nav css={logoStyle} onClick={handleClick}>
      <Link to="/">Wemet</Link>
    </nav>
  )
}

const logoStyle = css`
  align-items: center;
  justify-content: center;
  font-weight: bold;
  line-height: 2rem;
  height: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  background-color: whitesmoke;
  user-select: none;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  a {
    text-decoration: none;
    color: black;
    font-size: 1.125rem;
  }
`

export default Logo
