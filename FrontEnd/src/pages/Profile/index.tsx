import ProfileMenu from 'components/ProfileMenu'
import { titleStyle, wrapper } from './styles'

export type ProfileProps = {}

function Profile({}: ProfileProps) {
  return (
    <div css={wrapper}>
      <div css={titleStyle}>
        <img src={'/assets/profile.png'} alt={'profile'} />
        <h2>Profile</h2>
      </div>
      <div />
      <ProfileMenu />
    </div>
  )
}

export default Profile
