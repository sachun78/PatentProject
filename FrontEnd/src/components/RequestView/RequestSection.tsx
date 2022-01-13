import { css } from '@emotion/react'
import { Button } from 'antd'
import palette from '../../lib/palette'

type RequestSectionProps = {
  title: string
  children: React.ReactNode
  button_visible?: boolean
  onClick?: () => void
}

export default function RequestSection({
  title,
  children,
  button_visible,
  onClick,
}: RequestSectionProps) {
  return (
    <section css={sectionStyle}>
      <h3>{title}</h3>
      <div>
        {children}
        {button_visible !== undefined && (
          <Button onClick={onClick}>검색</Button>
        )}
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
