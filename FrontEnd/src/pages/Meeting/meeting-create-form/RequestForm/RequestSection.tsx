import { css } from '@emotion/react'
import palette from 'lib/palette'
import React from 'react'
import IconControl, { IconControlType } from 'components/IconControl/IconControl'

type RequestSectionProps = {
  title: string
  children: React.ReactNode
  checkButton?: React.ReactNode
  icon?: IconControlType
  h2?: boolean
}

function RequestSection({ title, children, checkButton, icon, h2 }: RequestSectionProps) {
  return (
    <section css={sectionStyle}>
      <div className={'header'}>
        {h2 ? (
          <h2>
            {icon && <IconControl name={icon} />}
            {title}
          </h2>
        ) : (
          <h3>
            {icon && <IconControl name={icon} />}
            {title}
          </h3>
        )}
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
    color: #6c6c6c;
    font: normal normal normal 16px/26px NanumSquareOTF;
    margin-top: 0;
    margin-bottom: 0.625rem;
    display: flex;
    align-items: center;
  }

  h2 {
    font: normal normal 800 16px/36px NanumSquareOTF;
    line-height: 2.25;
    margin: 0 0 0.25rem;
  }

  svg {
    margin-right: 0.5rem;
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
