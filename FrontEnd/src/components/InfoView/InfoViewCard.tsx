import { css } from '@emotion/react'
import { AutocompleteValue, Avatar, Button, TextField } from '@mui/material'
import React, { SyntheticEvent, useMemo, useRef, useState } from 'react'
import { careerStyle, countryWrapper, emailStyle, photoStyle, textStyle } from './InfoViewCardStyle'
import IconControl from '../IconControl'
import Input from '../Input/Input'
import Tag from '../Tag'
import CountrySelector from '../CountrySelector'
import { countries, CountryType } from '../CountrySelector/CountrySelector'

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
  editable?: boolean
  isEditMode?: boolean
  minHeight?: number
  fields?: string[]
  handleField?: () => { add: () => void, remove: (e: React.MouseEvent<SVGSVGElement>) => void, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
  countryValue?: string
  handleCountry?: (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InfoViewCardItem({
                            title, type, email, username,
                            photo, description, editable, isEditMode,
                            minHeight = 0,
                            fields, handleField,
                            countryValue, handleCountry,
                            onChange
                          }: InfoViewCardItemProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target != null) {
      const files = e.target.files
      if (files && files.length >= 1) {
        console.log(`${files[0].name} 파일 업로드중`)
      }
    }
  }
  const [editMode, setEditMode] = useState(isEditMode || false)
  const [prevValue, setPrevValue] = useState(description || '')
  const [currentText, setCurrentText] = useState(description || '')
  const [country, setCountry] = useState(countryValue || '')
  const [prevFields, setPrevFields] = useState(fields)
  const [currentFields, setCurrentFields] = useState(fields)
  const defaultCountry = useMemo(()=> countryValue || 'KR', [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value)
    if (onChange) onChange(e)
  }
  const toggle = () => {
    setEditMode(!editMode)
  }
  const onCancel = () => {
    toggle()
    setCurrentText(prevValue)
  }
  const onCancelField = () => {
    toggle()
    setCurrentFields(prevFields)
  }

  const onSave = () => {
    toggle()
    setPrevValue(currentText)
  }
  const onSaveField = () => {
    toggle()
    setPrevFields(currentFields)
  }

  const onCountryChange = (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => {
    if (!v) return
    setCountry(v.code)
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
      {type === 'photo' && username && <div css={photoStyle}>
        <div><Avatar sx={{ width: 100, height: 100, fontSize: 40 }}>
          {photo === undefined && `${username[0]}`}
        </Avatar></div>
        {editable && (<><input
          ref={fileRef}
          onChange={handleFileUpload}
          type='file'
          style={{ display: 'none' }}
          accept='image/*'
        />
          <button className={'btn'} onClick={() => fileRef?.current?.click()}><IconControl name={'upload'} /></button>
        </>)
        }
      </div>}
      {/*3. Name TYPE*/}
      {type === 'username' && <div css={emailStyle}>
        <div className='email-block'>{username}.</div>
      </div>}
      {/*4. Text TYPE*/}
      {type === 'text' && <div css={textStyle(minHeight)}>
        {!editMode && <div className='text'>
          <div>{currentText}</div>
          <button className={'btn'} onClick={toggle}><IconControl name={'edit'} /></button>
        </div>}
        {editMode && <Input
          placeholder={title}
          name={title}
          value={currentText || ''}
          onChange={handleChange}
          css={inputStyle}
        />}
        {editMode && !isEditMode && <div className='save-cancel'>
          <Button onClick={onSave} disabled={prevValue === currentText || currentText === ''}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>}
      </div>}
      {/*5. Field TYPE*/}
      {type === 'field' && handleField && <div css={textStyle(minHeight)}>
        {editMode && <div css={css`display: flex`}>
          <Input
            placeholder={title}
            name={title}
            value={description || ''}
            onChange={handleField().onChange}
            css={inputStyle}
          />
          <Button disabled={description === ''} className='plus' onClick={handleField().add}>add</Button>
        </div>}
        <div className='text'>
          <div css={tagStyle}>
            {fields?.map((tagName) => {
              return <Tag className={'tag'} label={tagName} key={tagName} visible={editMode}
                          onDelete={handleField().remove} />
            })}
            {fields?.length === 0 && !editMode && <div>Please Input Your Fields</div>}
          </div>
          {!editMode && <button onClick={toggle}><IconControl name={'edit'} /></button>}
        </div>
        {editMode && !isEditMode && <div className='save-cancel'>
          <Button disabled={prevFields === fields} onClick={onSaveField}>Save</Button>
          <Button onClick={onCancelField}>Cancel</Button>
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
            <Button onClick={toggle}>{editMode ? 'Save' : 'Edit'}</Button>
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

InfoViewCard.Item = InfoViewCardItem

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
