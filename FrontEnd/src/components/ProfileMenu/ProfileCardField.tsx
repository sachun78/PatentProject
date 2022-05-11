import { inputStyle, itemStyle, tagStyle, textStyle } from './styles'
import React from 'react'
import { css } from '@emotion/react'
import Input from '../Input/Input'
import { Button, Chip } from '@mui/material'
import useToggle from 'hooks/useToggle'

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
                return (
                  <Chip
                    sx={{
                      backgroundColor: '#1E3560',
                      color: '#fff',
                      borderRadius: '50px',
                      font: 'normal normal normal 14px/26px NanumSquareOTF',
                      '&+ &': {
                        marginLeft: '0.5rem',
                      },
                    }}
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
                <img src={'/assets/write.png'} alt={'edit-btn'} style={{ width: '17px', height: '17px' }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCardField
