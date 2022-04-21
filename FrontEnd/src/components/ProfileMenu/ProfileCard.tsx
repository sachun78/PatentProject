import { css } from '@emotion/react'
import { Avatar, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { careerStyle, emailStyle, itemStyle, photoStyle } from './styles'
import IconControl from '../IconControl'
import { upload } from 'lib/api/me/upload'
import { updateUserPhoto, userState } from 'atoms/authState'
import { useSetRecoilState } from 'recoil'
import gravatar from 'gravatar'
import ProfileCardText from './ProfileCardText'
import ProfileCardField from './ProfileCardField'
import ProfileCardEmail from './ProfileCardEmail'
import ProfileCardCountry from './ProfileCardCountry'
import ProfileCardSave from './ProfileCardSave'

export type ProfileCardProps = {
  children: React.ReactNode
}

function ProfileCard({ children }: ProfileCardProps) {
  return <div css={wrapper}>{children}</div>
}

const wrapper = css`
  margin-bottom: 2.5rem;
  border-radius: 0.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

type cardItemType = 'email' | 'photo' | 'username' | 'career'
// INFOVIEW CARD ITEM
export type ProfileCardItemProps = {
  title: string
  type: cardItemType
  email?: string
  username?: string
  photo?: string
  isEditMode?: boolean
  fields?: string[]
}

function ProfileCardItem({
  title,
  type,
  email,
  username,
  photo,
  isEditMode,
}: ProfileCardItemProps) {
  const setAuthState = useSetRecoilState(userState)
  const setAuthPhoto = (value: string) =>
    setAuthState((state) => updateUserPhoto(state, value))
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('profile_img', file)
      const result = await upload(formData)

      if (result) {
        setAuthPhoto(result.fileName)
      }
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
            <div>
              <Avatar
                sx={{ width: 100, height: 100 }}
                style={{ border: '0.1px solid lightgray' }}
                imgProps={{
                  crossOrigin: 'anonymous',
                }}
                src={
                  !photo
                    ? gravatar.url(email, {
                        s: '100px',
                        d: 'retro',
                      })
                    : `http://localhost:4000/static/${photo}`
                }
              />
            </div>
            {isEditMode && (
              <>
                <input
                  ref={fileRef}
                  onChange={handleFileUpload}
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  name="profile_img"
                />
                <button
                  className={'btn'}
                  onClick={(e) => {
                    fileRef?.current?.click()
                    e.preventDefault()
                  }}
                >
                  <IconControl name={'upload'} />
                </button>
              </>
            )}
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

ProfileCard.Item = ProfileCardItem
ProfileCard.Text = ProfileCardText
ProfileCard.Field = ProfileCardField
ProfileCard.Email = ProfileCardEmail
ProfileCard.Country = ProfileCardCountry
ProfileCard.Save = ProfileCardSave

export default ProfileCard
