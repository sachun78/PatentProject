import { css } from '@emotion/react'
import palette from '../../lib/palette'

type ViewBaseProps = {
  title: string
  children: React.ReactNode
}

function ViewBase({ title, children }: ViewBaseProps) {
  return (
    <div css={wrapper}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

const wrapper = css`
  flex: 1;
  display: flex;
  aligin-items: center;
  justify-content: center;
  flex-direction: column;
  padding-right: 1rem;
  padding-left: 1rem;
  h2 {
    line-hegiht: 1.5rem;
    background: ${palette.grey[100]};
    text-align: center;
  }
`

export default ViewBase
