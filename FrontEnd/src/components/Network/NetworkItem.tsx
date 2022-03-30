import { css } from '@emotion/react'

export type NetworkItemProps = {}

function NetworkItem({}: NetworkItemProps) {
  return <div css={ItemStyle}>
    <div>Thumbnail</div>
    <div>Name</div>
    <div>Company</div>
    <div>Position</div>
  </div>
}

const ItemStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 10px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  margin-top: 1rem;
`

export default NetworkItem
