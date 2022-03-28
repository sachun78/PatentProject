import { css } from '@emotion/react'
import InfoViewCard from './ProfileCard'

export type ProfileSectionProps = {
  title: string
  description?: string
  children: React.ReactNode
}

function ProfileSection({ title, children, description }: ProfileSectionProps) {
  return <div>
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

export default ProfileSection
