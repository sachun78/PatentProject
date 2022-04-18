import { countryWrapper, itemStyle } from './styles'
import React, { SyntheticEvent } from 'react'
import { css } from '@emotion/react'
import CountrySelector, { countries, CountryType } from '../CountrySelector/CountrySelector'
import { AutocompleteValue, Button } from '@mui/material'
import getCountryName from '../../lib/countryName'

export type ProfileCardCountryProps = {
  title: string
  editable?: boolean
  country: string
  onChange: (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => void
}

function ProfileCardCountry({ title, editable, country, onChange }: ProfileCardCountryProps) {
  const [edit, setEdit] = React.useState(editable ?? false)

  return <div css={itemStyle}>
    <div className='inner'>
      <div className='title'>
        <label>{title}</label>
      </div>
      <div css={countryWrapper}>
        <div css={css`display: flex;
          justify-content: space-between;
          width: 100%;`}>
          {edit && <CountrySelector onChange={onChange}
                                    defaultValue={countries[countries.findIndex((v) => (country) === v.code)]}
          />}
          {!edit &&
            <div css={countryNormalStyle}>{getCountryName(country)}</div>}
          {!edit && <div>
            <Button variant='contained' color='primary' onClick={() => {
              setEdit(prev => !prev)
            }}>{'Edit'}</Button>
          </div>}
        </div>
      </div>
    </div>
  </div>
}

const countryNormalStyle = css`
  display: flex;
  align-items: center;
`

export default ProfileCardCountry
