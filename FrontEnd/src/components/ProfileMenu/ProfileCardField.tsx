import { InitItemStyle, inputStyle, itemStyle, tagStyle, textStyle } from './styles'
import React from 'react'
import { css } from '@emotion/react'
import { Chip, OutlinedInput } from '@mui/material'
import useToggle from 'hooks/useToggle'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'

export type ProfileCardFieldProps = {
  title: string
  text: string
  editable?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAdd?: () => void
  onRemove: (t: string) => void
  fields: string[]
  size?: 'small' | 'large'
}

function ProfileCardField({
  title,
  text,
  editable,
  onChange,
  onAdd,
  onRemove,
  fields,
  size = 'large',
}: ProfileCardFieldProps) {
  const [edit, toggle] = useToggle(editable ?? false)
  const classes = useRemoveOutlineHover()

  return (
    <div css={size === 'large' ? itemStyle : InitItemStyle}>
      <div className="inner">
        <div className="title">
          <label>{title}</label>
        </div>
        <div css={textStyle}>
          {edit && (
            <div
              css={css`
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
              `}
            >
              <OutlinedInput
                placeholder={text}
                name={title}
                value={text || ''}
                onChange={onChange}
                css={inputStyle}
                classes={classes}
                style={{ height: '45px' }}
                endAdornment={
                  <button
                    disabled={text === ''}
                    className="plus"
                    onClick={onAdd}
                    style={{ minWidth: '25px', minHeight: '25px', marginRight: '15px' }}
                  >
                    +
                  </button>
                }
              />
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
