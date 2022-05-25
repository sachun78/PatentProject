import { InitItemStyle, inputStyle, itemStyle, textStyle } from './styles'
import React, { memo, useCallback } from 'react'
import { OutlinedInput } from '@mui/material'
import { useRemoveOutlineHover } from 'lib/styles/muiStyles'

export type ProfileCardTextProps = {
  editable?: boolean
  text: string
  title: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  multiline?: boolean
  size?: 'small' | 'large'
  name?: string
}

function ProfileCardText({
  editable = false,
  text,
  title,
  onChange,
  multiline,
  name,
  size = 'large',
}: ProfileCardTextProps) {
  const [edit, setEdit] = React.useState(editable)
  const toggle = useCallback(() => setEdit((prevState) => !prevState), [])
  const classes = useRemoveOutlineHover()

  return (
    <div css={size === 'large' ? itemStyle : InitItemStyle}>
      <div className="inner">
        <div className="title">
          <label>{title}</label>
        </div>
        <div css={textStyle}>
          {!edit && (
            <div className="text">
              <div>{text}</div>
              <button className={'btn'} onClick={toggle}>
                <img src={'/assets/write.png'} alt={'edit-btn'} style={{ width: '17px', height: '17px' }} />
              </button>
            </div>
          )}
          {edit && (
            <OutlinedInput
              placeholder={title}
              name={name || title}
              value={text || ''}
              onChange={onChange}
              autoComplete="off"
              css={inputStyle}
              classes={classes}
              style={!multiline ? { height: '40px' } : {}}
              multiline={multiline}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ProfileCardText)
