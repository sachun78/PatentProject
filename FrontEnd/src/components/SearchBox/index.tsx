import { IconButton, InputBase, Paper } from '@mui/material'
import React, { Dispatch, useCallback, useState } from 'react'
import { useSearchInputState } from 'atoms/searchInputState'
import IconControl from 'components/IconControl'
import { css } from '@emotion/react'
import { useFocusOutlineStyle } from 'lib/styles/muiStyles'

export type SearchBoxProps = {
  filter: Dispatch<string>
  post?: boolean
}

function SearchBox({ filter, post }: SearchBoxProps) {
  const [value, setValue] = useSearchInputState()
  const [bdColor, setBdColor] = useState('#9C9C9C')

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value)
    },
    [setValue]
  )

  const onSearch = useCallback(
    (e) => {
      e.preventDefault()
      filter(value)
      setValue('')
    },
    [filter, setValue, value]
  )

  const onFocus = () => {
    setBdColor('#910457')
  }

  const onBlur = () => {
    setBdColor('#9C9C9C')
  }

  const classes = useFocusOutlineStyle()

  if (post)
    return (
      <form
        css={nationStyle}
        style={{ width: '15.625rem', borderColor: `${bdColor}`, justifyContent: 'space-between' }}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmit={onSearch}
      >
        <input
          type="text"
          placeholder="Search"
          style={{ background: 'transparent', border: 'none' }}
          value={value}
          onChange={onChange}
        />
        <IconControl name={'searchIcon'} />
      </form>
    )

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '250px',
        borderRadius: '50px',
        background: 'transparent',
      }}
      classes={classes}
      onSubmit={onSearch}
    >
      <InputBase
        sx={{ ml: '18px', flex: 1 }}
        placeholder="Search"
        value={value}
        onChange={onChange}
        inputProps={{
          'aria-label': 'search schedule',
        }}
      />

      <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
        <IconControl name={'searchIcon'} />
      </IconButton>
    </Paper>
  )
}

export default SearchBox

const nationStyle = css`
  padding: 0.5rem 0.75rem;
  border: 1px solid #910457;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15.625rem;
  border-color: bdColor;
  justify-content: space-between;

  input {
    width: 12.5rem;
    height: 1.375rem;
  }

  input::placeholder {
    color: #d9d9d9;
  }

  input:focus {
    outline: none;
  }
`
