import { css } from '@emotion/react'
import palette from '../../lib/palette'

type ViewBaseProps = {
  title: string
  children: React.ReactNode
  isTopMargin?: boolean
}

function ViewBase({ title, children }: ViewBaseProps) {
  return (
    <div css={wrapper}>
      <h2 className='title'>{title}</h2>
      {children}
    </div>
  )
}

const wrapper = css`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;

  .title {
    font-weight: 800;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`

export default ViewBase
