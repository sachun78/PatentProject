import { css } from '@emotion/react'
import palette from 'lib/palette'
import React from 'react'

type RequestSectionProps = {
  title: string
  children: React.ReactNode
  checkButton?: React.ReactNode
}

function RequestSection({ title, children, checkButton }: RequestSectionProps) {
  return (
    <section css={sectionStyle}>
      <div className={'header'}>
        <h3>{title}</h3>
        {checkButton}
      </div>
      <div className={'child-item'}>{children}</div>
    </section>
  )
}

export default RequestSection

const sectionStyle = css`
  margin-bottom: 1rem;

  h3 {
    color: ${palette.blueGrey[800]};
    font-size: 1rem;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .child-item {
    position: relative;
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: flex-start;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25;
    color: ${palette.blueGrey[400]};
  }
`
