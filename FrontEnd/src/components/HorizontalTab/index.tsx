import React from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import media from '../../lib/styles/media'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { brandColor } from '../../lib/palette'

export type HorizontalTabProps = {
  className?: string
  children: React.ReactElement<TabItemProps>[]
  activeTab: string
  tabWidth: number
  align: 'center' | 'left'
  theme: 'teal' | 'gray'
}

function HorizontalTab({ className, children, activeTab, tabWidth, align, theme }: HorizontalTabProps) {
  const activeIndex = React.Children.toArray(children).findIndex(
    (tab) => (tab as React.ReactElement<TabItemProps>).props.name === activeTab
  )

  const ratio = 100 / children.length

  const springStyle = useSpring({
    transform: `translateX(${tabWidth * activeIndex}rem)`,
    width: `${ratio}%`,
    config: {
      friction: 16,
      tensiton: 160,
    },
  })

  return (
    <Block className={className} align={align}>
      <div className="tab-wrapper">
        {React.Children.map(children, (tab) => {
          return React.cloneElement(tab, {
            active: tab.props.name === activeTab,
            width: `${tabWidth}rem`,
            theme,
          })
        })}
        <Indicator style={springStyle} theme={theme} />
      </div>
    </Block>
  )
}

HorizontalTab.defaultProps = {
  tabWidth: 8,
  align: 'center',
  theme: 'teal',
}

export type TabItemProps = {
  name: string
  text: string
  to: string
  active?: boolean
  width?: string
  theme: 'teal' | 'gray'
}

function TabItem({ name, text, to, active, width, theme }: TabItemProps) {
  return (
    <StyledLink to={to} className={active ? 'active' : ''} style={{ width }} theme={theme}>
      {text}
    </StyledLink>
  )
}

TabItem.defaultProps = {
  theme: 'teal',
}

const Block = styled.div<{ align: 'center' | 'left' }>`
  display: flex;

  ${(props) =>
    props.align === 'center' &&
    css`
      justify-content: center;
    `}
  .tab-wrapper {
    display: flex;
    position: relative;
  }
`

const Indicator = styled(animated.div)<{ theme: 'teal' | 'gray' }>`
  height: 2px;
  display: block;
  position: absolute;
  bottom: 0px;
  background: ${brandColor};
  ${(props) =>
    props.theme === 'gray' &&
    css`
      background: ${brandColor};
    `}
`

const StyledLink = styled(Link)<{
  theme: 'teal' | 'gray'
}>`
  width: 8rem;
  height: 3rem;
  font-size: 1.125rem;

  ${media.small} {
    font-size: 1rem;
  }

  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &.active {
    font-weight: bold;
    color: ${brandColor};
    ${(props) =>
      props.theme === 'gray' &&
      css`
        color: black;
      `}
  }
`

HorizontalTab.TabItem = TabItem
export default HorizontalTab
