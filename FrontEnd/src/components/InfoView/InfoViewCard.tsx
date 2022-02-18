import { css } from '@emotion/react'
import { AutocompleteValue, Avatar, Button, TextField } from '@mui/material'
import React, { memo, SyntheticEvent, useMemo, useRef, useState } from 'react'
import { careerStyle, countryWrapper, emailStyle, photoStyle, textStyle } from './InfoViewCardStyle'
import IconControl from '../IconControl'
import Input from '../Input/Input'
import Tag from '../Tag'
import CountrySelector from '../CountrySelector'
import { countries, CountryType } from '../CountrySelector/CountrySelector'
import { upload } from '../../lib/api/me/upload'
import { patchProfile } from '../../lib/api/me/getProfile'
import { useProfileState } from '../../atoms/profileState'
import { updateUserPhoto, userState } from '../../atoms/authState'
import { useSetRecoilState } from 'recoil'

export type InfoViewCardProps = {
  children: React.ReactNode
}

function InfoViewCard({ children }: InfoViewCardProps) {
  return <div css={wrapper}>{children}</div>
}

const wrapper = css`
  margin-bottom: 4rem;
  border-radius: 0.4rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

type cardItemType = 'email' | 'photo' | 'country' | 'username' | 'text' | 'field' | 'career'
// INFOVIEW CARD ITEM
export type InfoViewCardItemProps = {
  title: string
  type: cardItemType
  email?: string
  username?: string
  photo?: string
  description?: string
  isEditMode?: boolean
  minHeight?: number
  fields?: string[]
  handleField?: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; add: () => void; remove: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void; }
  countryValue?: string
  handleCountry?: (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  reset?: () => void
  prevReset?: () => void
}

function InfoViewCardItem({
                            title, type, email, username,
                            photo, description, isEditMode,
                            fields, handleField,
                            countryValue, handleCountry,
                            onChange, reset, prevReset,
                            minHeight = 0
                          }: InfoViewCardItemProps) {
  const setAuthState = useSetRecoilState(userState)
  const setAuthPhoto = (value: string) => setAuthState((state) => updateUserPhoto(state, value))
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
  const [editMode, setEditMode] = useState(isEditMode || false)
  const [country, setCountry] = useState(countryValue || '')
  const [, setProfile] = useProfileState()
  const defaultCountry = useMemo(() => countryValue || 'KR', [])
  const toggle = () => {
    setEditMode(!editMode)
  }

  // TODO(cancel and save change One Function)
  const onCancel = () => {
    toggle()
    if (reset) reset()
  }

  const onSave = () => {
    toggle()
    if (prevReset) prevReset()
  }

  const onCountryChange = (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => {
    if (!v) return
    setCountry(v.code)
  }
  const onCountrySave = async () => {
    try {
      const result = await patchProfile({ country })
      if (result) {
        setProfile(result)
        toggle()
      }
    } catch (e) {
      console.log(e)
    }
  }
  return <div css={itemStyle}>
    <div className='inner'>
      <div className='title'>
        <label>{title}</label></div>
      {/*1. EMAIL TYPE*/}
      {type === 'email' && <div css={emailStyle}>
        <div className='email-block'>{email}</div>
        <p>
          <strong>Verified.</strong> Thank you for verifying your email.
        </p>
      </div>}
      {/*2. PHOTO TYPE*/}
      {type === 'photo' && username &&
        <div css={photoStyle}>
          <div>
            <Avatar sx={{ width: 100, height: 100, fontSize: 40 }}>
              {photo === undefined ? `${username[0]}` :
                (<img src={`/static/${photo}`} alt={username} />)
              }
            </Avatar>
          </div>
          {isEditMode && (
            <>
              <input
                ref={fileRef}
                onChange={handleFileUpload}
                type='file'
                style={{ display: 'none' }}
                accept='image/*'
                name='profile_img'
              />
              <button className={'btn'} onClick={(e) => {
                fileRef?.current?.click()
                e.preventDefault()
              }}><IconControl name={'upload'} /></button>
            </>)
          }
        </div>}
      {/*3. Name TYPE*/}
      {type === 'username' && <div css={emailStyle}>
        <div className='email-block'>{username}</div>
      </div>}
      {/*4. Text TYPE*/}
      {type === 'text' && <div css={textStyle(minHeight)}>
        {!editMode && <div className='text'>
          <div>{description}</div>
          <button className={'btn'} onClick={toggle}><IconControl name={'edit'} /></button>
        </div>}
        {editMode && <Input
          placeholder={title}
          name={title}
          value={description || ''}
          onChange={onChange}
          css={inputStyle}
        />}
        {editMode && !isEditMode && <div className='save-cancel'>
          <Button onClick={onSave} disabled={description === ''}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>}
      </div>}
      {/*5. Field TYPE*/}
      {type === 'field' && <div css={textStyle(minHeight)}>
        {editMode && <div css={css`display: flex`}>
          <Input
            placeholder={title}
            name={title}
            value={description || ''}
            onChange={(handleField && handleField.onChange)}
            css={inputStyle}
          />
          <Button disabled={description === ''} className='plus' onClick={handleField && handleField.add}>add</Button>
        </div>}
        <div className='text'>
          <div css={tagStyle}>
            {fields?.map((tagName) => {
              return <Tag className={'tag'} label={tagName} key={tagName} visible={editMode}
                          onDelete={handleField && handleField.remove} />
            })}
            {fields?.length === 0 && !editMode && <div>Please Input Your Fields</div>}
          </div>
          {!editMode && <button onClick={toggle}><IconControl name={'edit'} /></button>}
        </div>
        {editMode && !isEditMode && <div className='save-cancel'>
          <Button onClick={onSave}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>}
      </div>}
      {/*6. COUNTRY TYPE*/}
      {type === 'country' &&
        <div css={countryWrapper}>
          <div css={css`width: 100%;
            display: flex;`}>
            <CountrySelector disabled={!editMode} onChange={handleCountry || onCountryChange}
                             defaultValue={countries[countries.findIndex((v) => (defaultCountry) === v.code)]}
            />
          </div>
          {!isEditMode && <div className='save'>
            <Button onClick={onCountrySave}>{editMode ? 'Save' : 'Edit'}</Button>
          </div>}
        </div>}
      {/*7. CAREER TYPE*/}
      {type === 'career' &&
        <div css={careerStyle}>
          <TextField multiline fullWidth />
        </div>
      }
    </div>
  </div>
}

InfoViewCard.Item = memo(InfoViewCardItem)

const itemStyle = css`
  padding: 2rem;
  width: 100%;

  &:not(:first-of-type) {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }

  .inner {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    flex-grow: 1;
    font-size: 1.3rem;
  }

  .title {
    width: 18rem;
    flex-shrink: 0;
    padding-right: 2rem;

    label {
      font-weight: 700;
    }
  }

  .btn {
    all: unset;
    display: inline-flex;
  }
`
const inputStyle = css`
  font-size: 1.3rem;
  line-height: 1.2;
  min-height: 3.5rem;
  flex-grow: 1;
`
const tagStyle = css`
  display: block;
  flex-direction: column;
  margin-top: 0.5rem;

  .tag + .tag {
    margin-left: 0.5rem;
  }
`

export default InfoViewCard
