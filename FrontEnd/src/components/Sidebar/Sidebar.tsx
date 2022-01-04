import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'

type SidebarProps = {}

function Sidebar({}: SidebarProps) {
  const username: string = 'Wemet User' // Username data For Test

  return (
    <div css={baseStyle}>
      <div className="logo">WEMET</div>
      <Avatar size={96} icon={<UserOutlined />} />
      <div className="username">{username}</div>
    </div>
  )
}

const baseStyle = css`
  align-items: center;
  justify-content: center;
  display: flex;

  padding-bottom: 12rem;
  flex-direction: column;

  .logo {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    user-select: none;
  }

  .username {
    font-weight: 600;
    font-size: 1.125rem;
    margin-top: 1rem;
    text-align: center;

    :hover {
      text-decoration: underline;
      user-select: none;
      cursor: pointer;
    }
  }
`

export default Sidebar
