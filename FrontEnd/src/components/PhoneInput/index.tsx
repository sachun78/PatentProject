import { TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { forwardRef } from 'react'
import { countrySelectorStyle } from '../CountrySelector/CountrySelector'

export type PhoneInputProps = {}

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: '#fff',
  },
}))

function PhoneInput(props: PhoneInputProps, ref: React.Ref<HTMLInputElement>) {
  const classes = useStyles()

  return (
    <TextField
      {...props}
      InputProps={{
        className: classes.input,
      }}
      css={countrySelectorStyle}
      inputRef={ref}
      fullWidth
      size="small"
      label="Phone Number"
      variant="outlined"
      name="phone"
    />
  )
}

export default forwardRef(PhoneInput)
