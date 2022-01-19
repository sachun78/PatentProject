import { css } from '@emotion/react'
import { Avatar, Button } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import { emailStyle, photoStyle, textStyle } from './InfoViewCardStyle'
import IconControl from '../IconControl'
import Input from '../Input/Input'

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

type cardItemType = 'email' | 'photo' | 'country' | 'username' | 'text' | 'field'
// INFOVIEW CARD ITEM
export type InfoViewCardItemProps = {
  title: string
  type: cardItemType
  email?: string
  username?: string
  photo?: string
  description?: string
  editable?: boolean
  minWidth?: number
}

function InfoViewCardItem({
                            title,
                            type,
                            email,
                            username,
                            photo,
                            description,
                            editable,
                            minWidth = 0
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
  const [editMode, setEditMode] = useState(false)
  const [prevValue, setPrevValue] = useState(description)
  const [currentText, setCurrentText] = useState(description)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value)
  }
  const toggle = () => {
    setEditMode(!editMode)
  }
  const onCancel = () => {
    toggle()
    setCurrentText(prevValue)
  }
  const onSave = () => {
    toggle()
    setPrevValue(currentText)
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
          <button onClick={() => fileRef?.current?.click()}><IconControl name={'upload'} /></button>
        </>)
        }
      </div>}
      {/*3. Name TYPE*/}
      {type === 'username' && <div css={emailStyle}>
        <div className='email-block'>{username}.</div>
      </div>}
      {/*4. Text TYPE*/}
      {type === 'text' && <div css={textStyle(minWidth)}>
        {!editMode && <div className='text'>
          <div>{currentText}</div>
          <button onClick={toggle}><IconControl name={'edit'} /></button>
        </div>}
        {editMode && <Input
          placeholder={currentText}
          name={title}
          value={currentText}
          onChange={handleChange}
          css={inputStyle}
        />}
        {editMode && <div className='save-cancel'>
          <Button onClick={onSave} disabled={prevValue === currentText || currentText === ''}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>}
      </div>}
      {/*5. Field TYPE*/}
      {type === 'field' && <div css={textStyle(minWidth)}>
        {editMode && <Input
          placeholder={currentText}
          name={title}
          value={currentText}
          onChange={handleChange}
          css={inputStyle}
        />}
        <div className='text'>
          <div>block Items</div>
          {!editMode && <button onClick={toggle}><IconControl name={'edit'} /></button>}
        </div>
        {editMode && <div className='save-cancel'>
          <Button onClick={onSave} disabled={prevValue === currentText || currentText === ''}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>}
      </div>}
    </div>
  </div>
}

InfoViewCard.Item = InfoViewCardItem

const itemStyle = css`
  padding: 2rem;
  width: 100%;

  &:not(:first-child) {
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

  button {
    all: unset;
    display: inline-flex;
  }
`
const inputStyle = css`
  font-size: 1.3rem;
  line-height: 1.2;
  min-height: 4rem;
`

export default InfoViewCard
