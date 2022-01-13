import { css } from '@emotion/react'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import useSelectMenu from '../../hooks/useSelectMenu'
import React from 'react'
import { Link } from 'react-router-dom'
import IconControl from '../IconControl'
import palette from '../../lib/palette'

type topMenuProps = {}

function TopMenu({}: topMenuProps) {
  const { current, setCurrent } = useSelectMenu()

  const handleClick = (e: any) => {
    console.log('click ', e)

    // conference는 메뉴 선택 없이 링크로 이동하도록 함
    if (e.key && e.key.indexOf('conf') !== -1) {
      return
    }
    setCurrent(e.key)
  }

  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ width: 720 }}
        css={menuStyle}
      >
        <Menu.Item key="mem">
          <Link to={'/membership'}>MemberShip</Link>
        </Menu.Item>
        <Menu.Item key="schedule">
          <Link to={'/schedule'}>Schedule</Link>
        </Menu.Item>
        <Menu.Item key="net">
          <Link to={'/network'}>Network</Link>
        </Menu.Item>
        <SubMenu key="conference" title="Conference">
          <Menu.ItemGroup css={svgStyle}>
            <Menu.Item key="conf:1">
              <a
                href="https://naver.com/"
                target="_blank"
                rel="noopener noreferer"
              >
                2022 INTA <IconControl name="links" />
              </a>
            </Menu.Item>
            <Menu.Item key="conf:2">
              2022 AIPLA <IconControl name="links" />
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </>
  )
}

const menuStyle = css`
  margin-top: 0.5rem;
  min-width: 384px;
  user-select: none;
`

const svgStyle = css`
  svg {
    width: 1rem;
    height: 1rem;
    float: right;
    margin-top: 0.75rem;
    color: ${palette.blueGrey[400]};
  }
`

export default TopMenu
