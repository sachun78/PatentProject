import { countryWrapper, itemStyle } from './styles'
import React, { SyntheticEvent } from 'react'
import { css } from '@emotion/react'
import CountrySelector, { countries, CountryType } from '../CountrySelector/CountrySelector'
import { AutocompleteValue } from '@mui/material'

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
          {!edit && <div>{countries[countries.findIndex((v) => (country) === v.code)].label}</div>}
          {/*{!edit && <div>*/}
          {/*  <Button variant='contained' color='primary' onClick={onCountrySave}>{edit ? 'Ok' : 'Edit'}</Button>*/}
          {/*</div>}*/}
        </div>
      </div>
    </div>
  </div>
}

export default ProfileCardCountry
