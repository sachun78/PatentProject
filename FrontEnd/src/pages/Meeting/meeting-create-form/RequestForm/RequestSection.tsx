import { css } from '@emotion/react'
import palette from 'lib/palette'

type RequestSectionProps = {
  title: string
  children: React.ReactNode
}

function RequestSection({ title, children }: RequestSectionProps) {
  return (
    <section css={sectionStyle}>
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  )
}

export default RequestSection

const sectionStyle = css`
  section + & {
    margin-top: 0.78125rem;
  }

  margin-bottom: 0.5rem;

  h3 {
    color: ${palette.blueGrey[800]};
    font-size: 1.25rem;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 0;
  }

  & > div {
    position: relative;
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: flex-start;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.25;
    color: ${palette.blueGrey[400]};
  }
`
