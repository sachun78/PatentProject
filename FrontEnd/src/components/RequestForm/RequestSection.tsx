import { css } from '@emotion/react'
import { Button } from '@mui/material'
import palette from '../../lib/palette'

type RequestSectionProps = {
  title: string
  children: React.ReactNode
}

export default function RequestSection({
                                         title,
                                         children
                                       }: RequestSectionProps) {
  return (
    <section css={sectionStyle}>
      <h3>{title}</h3>
      <div>
        {children}
      </div>
    </section>
  )
}

const sectionStyle = css`
  section + & {
    margin-top: 1.25rem;
  }

  h3 {
    color: ${palette.blueGrey[800]};
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5rem;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }

  & > div {
    position: relative;
    flex-direction: row;
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: center;

    .ant-btn {
      margin-left: 1rem;
    }
  }
`
