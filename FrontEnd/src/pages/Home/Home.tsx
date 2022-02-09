import { css } from '@emotion/react'
import Posts from '../../components/Posts'
import AddtionalFormModal from '../../components/AddtionalFormModal'
type HomeProps = {}

function Home({}: HomeProps) {
  return (
    <div css={baseStyle}>
      <Posts />
    <AddtionalFormModal/>
    </div>
  )
}

const baseStyle = css`
  height: 100%;
`

export default Home
