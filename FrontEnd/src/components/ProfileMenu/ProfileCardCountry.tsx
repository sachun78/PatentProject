import { countryWrapper, InitItemStyle, itemStyle } from './styles'
import React, { memo, SyntheticEvent } from 'react'
import { css } from '@emotion/react'
import CountrySelector, { countries, CountryType } from '../CountrySelector/CountrySelector'
import { AutocompleteValue } from '@mui/material'
import getCountryName from 'lib/countryName'
import styled from '@emotion/styled'
import { resetButton } from 'lib/styles/resetButton'

export type ProfileCardCountryProps = {
  title: string
  editable?: boolean
  country: string
  onChange: (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => void
  size?: 'small' | 'large'
}

function ProfileCardCountry({ title, editable, country, onChange, size = 'large' }: ProfileCardCountryProps) {
  const [edit, setEdit] = React.useState(editable ?? false)

  return (
    <div css={size === 'large' ? itemStyle : InitItemStyle}>
      <div className="inner">
        <div className="title">
          <label>{title}</label>
        </div>
        <div css={countryWrapper}>
          <CountryInner>
            {edit && (
              <CountrySelector
                onChange={onChange}
                defaultValue={countries[countries.findIndex((v) => country === v.code)]}
              />
            )}
            {!edit && <div css={countryNormalStyle}>{getCountryName(country)}</div>}
            {!edit && (
              <div style={{ alignSelf: 'center' }}>
                <button
                  css={resetButton}
                  onClick={() => {
                    setEdit((prev) => !prev)
                  }}
                >
                  <img src={'/assets/write.png'} alt={'edit-btn'} style={{ width: '17px', height: '17px' }} />
                </button>
              </div>
            )}
          </CountryInner>
        </div>
      </div>
    </div>
  )
}

const countryNormalStyle = css`
  display: flex;
  align-items: center;
  color: #333333;
  font: normal normal 800 16px/18px NanumSquareOTF;
`

const CountryInner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export default memo(ProfileCardCountry)
