import ProfileMenu from 'components/ProfileMenu'
import { titleStyle, wrapper } from './styles'
import { Helmet } from 'react-helmet-async'
import React from 'react'

export type ProfileProps = {}

function Profile({}: ProfileProps) {
  return (
    <div css={wrapper}>
      <Helmet>
        <title>Profile - WEMET</title>
      </Helmet>
      <div css={titleStyle}>
        <img src={'/assets/profile.png'} alt={'profile'} />
        <h2>Profile</h2>
      </div>
      <ProfileMenu />
    </div>
  )
}

export default Profile
