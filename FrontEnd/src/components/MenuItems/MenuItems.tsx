import { css } from '@emotion/react'
import { Card } from 'antd'

type MenuItemsProps = {
  items: menuItem[]
}

export type menuItem = { id: number; data: string }

// TODO Rename This Component
function MenuItems({ items }: MenuItemsProps) {
  return (
    <div css={menuStyle}>
      <button css={titleStyle}>Sponsor</button>
      {items &&
        items.map((item) => (
          <Card
            type="inner"
            title={item.data}
            key={item.id}
            css={flexButtonStyle}
          >
            <p> {item.data}</p>
          </Card>
        ))}
    </div>
  )
}

const menuStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;

  .ant-btn + .ant-btn {
    margin-top: 1rem;
  }
`

const titleStyle = css`
  all: unset;
  cursor: pointer;
  text-align: center;
  height: 2.5rem;
  background-color: whitesmoke;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.125rem;
  border-radius: 0.5rem;
`
const flexButtonStyle = css`
  flex-grow: 1;
  margin-bottom: 0.5rem;
`

export default MenuItems
