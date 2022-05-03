import { inputStyle, itemStyle, tagStyle, textStyle } from './styles'
import React from 'react'
import { css } from '@emotion/react'
import Input from '../Input/Input'
import { Button, Chip } from '@mui/material'
import IconControl from '../IconControl/IconControl'
import useToggle from 'hooks/useToggle'
import randomColor from 'randomcolor'

export type ProfileCardFieldProps = {
  title: string
  text: string
  editable?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAdd?: () => void
  onRemove: (t: string) => void
  fields: string[]
}

function ProfileCardField({ title, text, editable, onChange, onAdd, onRemove, fields }: ProfileCardFieldProps) {
  const [edit, toggle] = useToggle(editable ?? false)

  return (
    <div css={itemStyle}>
      <div className="inner">
        <div className="title">
          <label>{title}</label>
        </div>
        <div css={textStyle}>
          {edit && (
            <div
              css={css`
                display: flex;
              `}
            >
              <Input placeholder={title} name={title} value={text || ''} onChange={onChange} css={inputStyle} />
              <Button
                disabled={text === ''}
                className="plus"
                onClick={onAdd}
                style={{ width: '1.5rem', fontSize: '0.875rem', height: '40px' }}
              >
                add
              </Button>
            </div>
          )}
          <div className="text">
            <div css={tagStyle}>
              {fields?.map((tagName) => {
                const color = randomColor({
                  luminosity: 'light',
                  format: 'rgb', // e.g. 'rgb(225,200,20)'
                  seed: tagName,
                })
                return (
                  <Chip
                    sx={{ marginBottom: 0.5, marginRight: 0.3, marginTop: 0.5, backgroundColor: color }}
                    variant="outlined"
                    label={tagName}
                    key={tagName}
                    onDelete={edit ? () => onRemove(tagName) : undefined}
                  />
                )
              })}
              {fields?.length === 0 && !edit && <div>Please Input Your Fields</div>}
            </div>
            {!edit && (
              <button onClick={toggle}>
                <IconControl name={'edit'} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCardField
