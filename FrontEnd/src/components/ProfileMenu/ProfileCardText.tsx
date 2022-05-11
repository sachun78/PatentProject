import { inputStyle, itemStyle, textStyle } from './styles'
import Input from '../Input/Input'
import React, { memo, useCallback } from 'react'

export type ProfileCardTextProps = {
  editable?: boolean
  text: string
  title: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function ProfileCardText({ editable = false, text, title, onChange }: ProfileCardTextProps) {
  const [edit, setEdit] = React.useState(editable)
  const toggle = useCallback(() => setEdit((prevState) => !prevState), [])

  return (
    <div css={itemStyle}>
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
            <Input
              placeholder={title}
              name={title}
              value={text || ''}
              onChange={onChange}
              autoComplete="off"
              css={inputStyle}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ProfileCardText)
