import { css } from '@emotion/react'
import palette from '../../lib/palette'

type ViewBaseProps = {
  title: string
  children: React.ReactNode
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
  /* aligin-items: center; this use for miniSize*/
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
  
  .title {
    line-height: 1.2;
    font-weight: 600;
    font-size: 1.8rem;
    padding-bottom: 1rem;
  }
`

export default ViewBase
