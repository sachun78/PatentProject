import { css } from '@emotion/react'
import InfoViewCard from './InfoViewCard'

export type InfoViewSectionProps = {
  title: string
  children: React.ReactNode
}

function InfoViewSection({ title,children }: InfoViewSectionProps) {
  return <div>
    <div css={headerStyle}>
      <h3>{title}</h3>
      <div className='sub-comment'>
        <p>Where we send important messages about your account </p></div>
    </div>
    <InfoViewCard>
      {children}
    </InfoViewCard>
  </div>
}

const headerStyle = css`
  margin-bottom: 2rem;

  h3 {
    line-height: 1.2;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0;
  }

  .sub-comment {
    margin-top: 1rem;

    p {
      line-height: 1.5;
      font-size: 1.3rem;
      color: #53535f;
    }
  }
`

export default InfoViewSection
