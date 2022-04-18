import React from 'react'
import { css } from '@emotion/react'
import InfoViewCard from './ProfileCard'

export type ProfileSectionProps = {
  title: string
  description?: string
  children: React.ReactNode
}

function ProfileSection({ title, children, description }: ProfileSectionProps) {
  return <>
    <div css={headerStyle}>
      <h3>{title}</h3>
      <div className='sub-comment'>
        {!description && <p>Where we send important messages about your account </p>}
        {description && <p>{description}</p>}
      </div>
    </div>
    <InfoViewCard>
      {children}
    </InfoViewCard>
  </>
}

const headerStyle = css`
  margin-bottom: 1.25rem;

  h3 {
    line-height: 1.2;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0;
  }

  .sub-comment {
    margin-top: 0.625rem;

    p {
      line-height: 1.2;
      font-size: 0.825rem;
      color: #53535f;
      margin: 0;
    }
  }
`

export default ProfileSection
