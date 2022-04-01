import { css } from '@emotion/react'
import palette from '../../lib/palette'

type RequestSectionProps = {
  title: string
  children: React.ReactNode
}

function RequestSection({ title, children }: RequestSectionProps) {
  return (
    <section css={sectionStyle}>
      <h3>{title}</h3>
      <div>
        {children}
      </div>
    </section>
  )
}

export default RequestSection

const sectionStyle = css`
  section + & {
    margin-top: 1.25rem;
  }

  max-width: 60rem;
  margin-bottom: 1.5rem;

  &:first-of-type {
    margin-bottom: 0;
  }

  h3 {
    color: ${palette.blueGrey[800]};
    font-size: 1.6rem;
    line-height: 1.5rem;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }

  & > div {
    position: relative;
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: flex-start;
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.blueGrey[400]};
  }
`
