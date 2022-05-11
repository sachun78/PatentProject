import React from 'react'
import { css } from '@emotion/react'
import ProfileCard from './ProfileCard'

export type ProfileSectionProps = {
  title: string
  description?: string
  children: React.ReactNode
}

function ProfileSection({ title, children, description }: ProfileSectionProps) {
  return (
    <>
      <div css={headerStyle}>
        <h3>{title}</h3>
        <div className="sub-comment">
          {!description && <p>Where we send important messages about your account </p>}
          {description && <p>{description}</p>}
        </div>
      </div>
      <ProfileCard>{children}</ProfileCard>
    </>
  )
}

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  h3 {
    line-height: 1.125;
    color: #6c6c6c;
    font: normal normal 800 16px/18px NanumSquareOTF;
  }

  .sub-comment {
    p {
      font: normal normal normal 14px/26px NanumSquareOTF;
      color: #6c6c6c;
      line-height: 1.857142857;
    }
  }
`

export default ProfileSection
