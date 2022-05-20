import { InitItemStyle, itemStyle } from './styles'
import React, { useCallback, useRef, useState } from 'react'
import PhoneInputT from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import PhoneInput from '../PhoneInput'
import { useProfileFormState } from 'atoms/profileFormState'
import styled from '@emotion/styled'
import { brandColor } from 'lib/palette'

export type ProfileCardPhoneProps = {
  title: string
  phone?: string
  size?: 'small' | 'large'
}

function ProfileCardPhone({ title, phone, size = 'large' }: ProfileCardPhoneProps) {
  const [value, setValue] = useProfileFormState()
  const [edit, setEdit] = useState(false)
  const ref = useRef(null)
  const onChange = useCallback(
    (value?: any | undefined) => {
      setValue(value)
    },
    [setValue]
  )
  return (
    <div css={size === 'large' ? itemStyle : InitItemStyle}>
      <div className="inner">
        <div className="title">
          <label>{title}</label>
        </div>
        {!edit && phone ? (
          <HoverP onClick={() => setEdit(true)}>{phone}</HoverP>
        ) : (
          <PhoneInputT
            placeholder="Enter phone number"
            value={value}
            onChange={onChange}
            inputComponent={PhoneInput}
            ref={ref}
            onBlur={() => setEdit(false)}
            international
            style={{ width: '100%' }}
          />
        )}
      </div>
    </div>
  )
}

const HoverP = styled.p`
  &:hover {
    cursor: pointer;
    color: ${brandColor};
  }

  color: #333;
  font: normal normal 800 16px/18px NanumSquareOTF;
`
export default ProfileCardPhone
