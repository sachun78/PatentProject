import { css } from '@emotion/react'
import palette from '../../lib/palette'
import MenuItems from '../MenuItems'
import { menuItem } from '../MenuItems/MenuItems'

type SponsorViewProps = {}

const MenuItemTestData: menuItem[] = [
  {
    id: 0,
    data: '특허법인 성암',
  },
  {
    id: 1,
    data: '특허법인 한양',
  },
  {
    id: 2,
    data: '특허법인 성암',
  },
  {
    id: 3,
    data: '특허사무소 시선',
  },
]

function SponsorView({}: SponsorViewProps) {
  return (
    <div css={sponsorViewStyle}>
      <MenuItems items={MenuItemTestData} />
    </div>
  )
}

const sponsorViewStyle = css`
  flex: 1;
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  flex-direction: row;
`

export default SponsorView
