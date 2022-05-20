import { css } from '@emotion/react'
import { Avatar, IconButton, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { careerStyle, emailStyle, itemStyle, photoStyle } from './styles'
import { upload } from 'lib/api/me/upload'
import ProfileCardText from './ProfileCardText'
import ProfileCardField from './ProfileCardField'
import ProfileCardCountry from './ProfileCardCountry'
import ProfileCardSave from './ProfileCardSave'
import useProfileImg from 'hooks/useProfileImg'
import ProfileCardPhone from './ProfileCardPhone'

export type ProfileCardProps = {
  children: React.ReactNode
}

function ProfileCard({ children }: ProfileCardProps) {
  return <div css={wrapper}>{children}</div>
}

ProfileCard.Item = ProfileCardItem
ProfileCard.Text = ProfileCardText
ProfileCard.Field = ProfileCardField
ProfileCard.Country = ProfileCardCountry
ProfileCard.Save = ProfileCardSave
ProfileCard.Phone = ProfileCardPhone

const wrapper = css`
  margin-bottom: 1.875rem;
  border-radius: 1rem;
`

type cardItemType = 'email' | 'photo' | 'username' | 'career'
// INFOVIEW CARD ITEM
export type ProfileCardItemProps = {
  title: string
  type: cardItemType
  email?: string
  username?: string
  isEditMode?: boolean
  fields?: string[]
}

function ProfileCardItem({ title, type, email, username }: ProfileCardItemProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const { profileSrc } = useProfileImg()
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('profile_img', file)
      upload(formData).then(() => {
        window.location.reload()
      })
    }
  }

  return (
    <div css={itemStyle}>
      <div className="inner">
        <div className="title">
          <label>{title}</label>
        </div>
        {/*1. EMAIL TYPE*/}
        {type === 'email' && (
          <div css={emailStyle}>
            <div className="email-block">{email}</div>
            <p>
              <strong>Verified.</strong> Thank you for verifying your email.
            </p>
          </div>
        )}
        {/*2. PHOTO TYPE*/}
        {type === 'photo' && email && (
          <div css={photoStyle}>
            <div className={'img'}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                style={{ border: '0.1px solid lightgray' }}
                imgProps={{
                  crossOrigin: 'anonymous',
                }}
                src={profileSrc}
              />
            </div>
            <input
              ref={fileRef}
              onChange={handleFileUpload}
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              name="profile_img"
            />
            <div className={'upload-btn'}>
              <IconButton
                disableTouchRipple={true}
                onClick={(e) => {
                  fileRef?.current?.click()
                  e.preventDefault()
                }}
              >
                <img src={'/assets/upload.png'} style={{ width: 20, height: 20 }} />
              </IconButton>
            </div>
          </div>
        )}
        {/*3. Name TYPE*/}
        {type === 'username' && (
          <div css={emailStyle}>
            <div className="email-block">{username}</div>
          </div>
        )}
        {/*4. CAREER TYPE*/}
        {type === 'career' && (
          <div css={careerStyle}>
            <TextField multiline fullWidth />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
