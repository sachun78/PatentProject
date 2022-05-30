import { Avatar, Box, Grid } from '@mui/material'
import { API_PATH } from 'lib/api/client'
import gravatar from 'gravatar'
import getCountryName from 'lib/countryName'
import React from 'react'
import { IProfileDetail } from 'lib/api/types'
import { FlexRow } from './styles'
import IconControl from '../IconControl'
import { FieldItem } from 'pages/User/styles'

export type ProfileBoxProps = {
  profileData: IProfileDetail
}

function ProfileBox({ profileData }: ProfileBoxProps) {
  return (
    <Box
      style={{
        background: 'white',
        color: '#333',
        padding: '1.25rem 0.9375rem',
        borderRadius: '1rem',
        boxShadow: '2px 2px 8px #00000029',
        marginTop: '10px',
      }}
    >
      <FlexRow>
        <Avatar
          alt={'photo'}
          src={`${API_PATH}static/${profileData.email}`}
          sx={{ width: 47, height: 47, marginRight: '15px' }}
          style={{ border: '1px solid lightgray' }}
          imgProps={{ crossOrigin: 'anonymous' }}
        >
          <img src={gravatar.url(profileData.email ?? '', { s: '47px', d: 'retro' })} alt={'fallback-img'} />
        </Avatar>
        <div className={'header'}>
          <p>{profileData.username}</p>
          <p>
            <span>
              <IconControl name={'company'} /> {profileData.company}
            </span>
            <span>
              <IconControl name={'country'} /> {getCountryName(profileData.country ?? 'KR')}
            </span>
          </p>
        </div>
      </FlexRow>
      <FlexRow>
        <Grid container sx={{ marginLeft: '3.875rem' }}>
          {profileData.field?.map((elem: string) => (
            <FieldItem key={elem} color="#1E3560" style={{ marginTop: '0.25rem' }}>
              {elem}
            </FieldItem>
          ))}
        </Grid>
      </FlexRow>
    </Box>
  )
}

export default ProfileBox
