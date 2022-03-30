import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import media from '../../lib/styles/media'
import VerticalBarItem from './VerticalBarItem'
import IconControl from '../IconControl'

export type VerticalBarProps = {}

function VerticalBar({}: VerticalBarProps) {
  return (
    <div css={bar}>
      <div css={endBlock('top')}>
      </div>
      <div css={links}>
        <VerticalBarItem icon='home' text='Home' to='' />
        <VerticalBarItem icon='schedule' text='MemberShip' to='/membership' />
        <VerticalBarItem icon='network' text='Network' to='/network' />
        <VerticalBarItem icon='links' text='Conference' to='/conference' />
      </div>
      <div css={endBlock('bottom')}>
      </div>
    </div>
  )
}

const bar = css`
  display: none;

  ${media.xlarge} {
    display: flex;
  }

  flex-direction: column;
  padding-top: 3.2rem;
  padding-bottom: 3.2rem;
  flex: 1;
  align-items: center;

  .logo {
    width: 4rem;
    height: 4rem;
  }
`

const links = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const endBlock = (position: 'top' | 'bottom') => css`
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${position === 'top' ? 'flex-start' : 'flex-end'};

  a {
    display: block;
  }
`

export default VerticalBar
