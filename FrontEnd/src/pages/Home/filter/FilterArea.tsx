import { css } from '@emotion/react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { countries } from 'components/CountrySelector/CountrySelector'

type filterAreaProps = {
  getCountry: Function
}

function FilterArea({ getCountry }: filterAreaProps) {
  return (
    <Autocomplete
      css={containerStyle}
      id="country-select-demo"
      multiple
      onChange={(e: any, newValue: any) => {
        getCountry(newValue.map((val: any) => val.code))
      }}
      options={countries}
      autoHighlight
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="16"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}){/* +{option.phone} */}
        </Box>
      )}
      renderInput={(params) => (
        <>
          <TextField
            css={textStyle}
            {...params}
            placeholder="Select countries to exclude from the post display"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        </>
      )}
    />
  )
}

interface CountryType {
  code: string
  label: string
  phone: string
  suggested?: boolean
}

export default FilterArea

const textStyle = css`
  input::placeholder {
    color: #6c6c6c;
    font: 14px NanumSquareOTF;
    align-items: center;
  }
`

const containerStyle = css`
  width: 30.625rem;
  flex-grow: 1;
  height: 1.375rem;
  padding: 0 0 0 0;
  align-items: center;

  .MuiFormControl-root {
    position: relative;
    height: 90%;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .MuiOutlinedInput-root {
    position: relative;
  }

  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }

  & .MuiAutocomplete-tag {
    height: 1.2rem;
  }
`
