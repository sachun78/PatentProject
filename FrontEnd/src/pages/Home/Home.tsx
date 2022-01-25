import { css } from '@emotion/react'
import Posts from '../../components/Posts'
import Sponsors from '../../components/Sponsors'
import AddtionalFormModal from '../../components/AddtionalFormModal'
type HomeProps = {}

function Home({}: HomeProps) {
  return (
    <div css={baseStyle}>
      <Posts />
      <Sponsors />
    <AddtionalFormModal/>
    </div>
  )
}

const baseStyle = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
`

export default Home
