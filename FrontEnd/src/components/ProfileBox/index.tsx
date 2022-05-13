import { brandColor } from 'lib/palette'
import { Avatar, Box } from '@mui/material'
import { API_PATH } from 'lib/api/client'
import gravatar from 'gravatar'
import getCountryName from 'lib/countryName'
import React from 'react'
import { IProfileDetail } from 'lib/api/types'
import { FlexRow } from './styles'

export type ProfileBoxProps = {
  profileData: IProfileDetail
}

function ProfileBox({ profileData }: ProfileBoxProps) {
  return (
    <Box style={{ background: brandColor, color: '#fff', padding: '4px', borderRadius: '8px', margin: '4px' }}>
      <h3>Member</h3>
      <FlexRow>
        <Avatar
          alt={'photo'}
          src={`${API_PATH}static/${profileData.photo_path}`}
          sx={{ width: 44, height: 44, marginRight: 1, marginLeft: 1 }}
          imgProps={{ crossOrigin: 'anonymous' }}
        >
          <img src={gravatar.url(profileData.email ?? '', { s: '44px', d: 'retro' })} alt={'fallback-img'} />
        </Avatar>
        <div>
          <p>{profileData.username}</p>
          <p>
            {profileData.company + ' ' + getCountryName(profileData.country ?? 'KR')}
            {profileData.field?.map((item) => (
              <span key={item}>{' ' + item} </span>
            ))}
          </p>
        </div>
      </FlexRow>
    </Box>
  )
}

export default ProfileBox
