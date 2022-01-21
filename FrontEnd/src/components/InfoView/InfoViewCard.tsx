import { css } from '@emotion/react'
import { Avatar, Button, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { careerStyle, countryWrapper, emailStyle, photoStyle, textStyle } from './InfoViewCardStyle'
import IconControl from '../IconControl'
import Input from '../Input/Input'
import Tag from '../Tag'
import CountrySelector from '../CountrySelector'

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
  minHeight?: number
  fields?: string[]
}

function InfoViewCardItem({
                            title,
                            type,
                            email,
                            username,
                            photo,
                            description,
                            editable,
                            minHeight = 0,
                            fields
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
  const [prevValue, setPrevValue] = useState(description || '')
  const [currentText, setCurrentText] = useState(description || '')
  const [prevFields, setPrevFields] = useState(fields)
  const [currentFields, setCurrentFields] = useState(fields)
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
  const onClickAdd = () => {
    if (currentFields === undefined) return
    if (currentText === undefined) return
    const findResult = currentFields.find((value) => value === currentText)
    if (findResult === undefined) {
      setCurrentFields([...currentFields, currentText])
      console.log('success')
      return
    }
  }

  const onDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    const name = e.currentTarget.getAttribute('name')
    setCurrentFields(currentFields?.filter(v => v !== name))
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
      {type === 'text' && <div css={textStyle(minHeight)}>
        {!editMode && <div className='text'>
          <div>{currentText}</div>
          <button onClick={toggle}><IconControl name={'edit'} /></button>
        </div>}
        {editMode && <Input
          placeholder={currentText}
          name={title}
          value={currentText || ''}
          onChange={handleChange}
          css={inputStyle}
        />}
        {editMode && <div className='save-cancel'>
          <Button onClick={onSave} disabled={prevValue === currentText || currentText === ''}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>}
      </div>}
      {/*5. Field TYPE*/}
      {type === 'field' && <div css={textStyle(minHeight)}>
        {editMode && <div css={css`display: flex`}><Input
          placeholder={currentText}
          name={title}
          value={currentText || ''}
          onChange={handleChange}
          css={inputStyle}
        />
          <Button disabled={currentText === ''} className='plus' onClick={onClickAdd}>add</Button>
        </div>}
        <div className='text'>
          <div css={tagStyle}>  {/*Change TO MAP*/}
            {currentFields?.map((tagName) => {
              return <Tag className={'tag'} label={tagName} key={tagName} visible={editMode} onDelete={onDelete} />
            })}
            {currentFields?.length === 0 && !editMode && <div>Please Input Your Fields</div>}
          </div>
          {!editMode && <button onClick={toggle}><IconControl name={'edit'} /></button>}
        </div>
        {editMode && <div className='save-cancel'>
          <Button disabled={prevFields === currentFields} onClick={onSaveField}>Save</Button>
          <Button onClick={onCancelField}>Cancel</Button>
        </div>}
      </div>}
      {/*6. COUNTRY TYPE*/}
      {type === 'country' &&
        <div css={countryWrapper}>
          <div css={css`width: 100%;
            display: flex;`}>
            <CountrySelector disabled={!editMode} />
          </div>
          <div className='save'>
            <Button onClick={toggle}>{editMode ? 'Save' : 'Edit'}</Button>
          </div>
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

  button {
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
