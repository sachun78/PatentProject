import { inputStyle, itemStyle, tagStyle, textStyle } from './styles'
import React from 'react'
import { css } from '@emotion/react'
import Input from '../Input/Input'
import { Button, Chip } from '@mui/material'
import IconControl from '../IconControl/IconControl'
import useToggle from '../../hooks/useToggle'

export type ProfileCardFieldProps = {
  title: string
  text: string
  editable?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAdd?: () => void
  onRemove?: () => void
  fields: string[]
}

function ProfileCardField({ title, text, editable, onChange, onAdd, onRemove, fields }: ProfileCardFieldProps) {
  const [edit, toggle] = useToggle(editable ?? false)

  return <div css={itemStyle}>
    <div className='inner'>
      <div className='title'>
        <label>{title}</label>
      </div>
      <div css={textStyle}>
        {edit && <div css={css`display: flex`}>
          <Input
            placeholder={title}
            name={title}
            value={text || ''}
            onChange={onChange}
            css={inputStyle}
          />
          <Button disabled={text === ''} className='plus' onClick={onAdd}>add</Button>
        </div>}
        <div className='text'>
          <div css={tagStyle}>
            {fields?.map((tagName) => {
              return <Chip variant='outlined' label={tagName} key={tagName} onDelete={onRemove} />
              /*<Tag className={'tag'} label={tagName} key={tagName} visible={edit} onDelete={onRemove} />*/
            })}
            {fields?.length === 0 && !edit && <div>Please Input Your Fields</div>}
          </div>
          {!edit && <button onClick={toggle}><IconControl name={'edit'} /></button>}
        </div>
        {edit && !editable && <div className='save-cancel'>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </div>}
      </div>
    </div>
  </div>
}

export default ProfileCardField
