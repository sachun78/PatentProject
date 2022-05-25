import { IconButton, InputBase, Paper } from '@mui/material'
import { useSearchInputState } from 'atoms/searchInputState'
import IconControl from 'components/IconControl'
import { useFocusOutlineStyle } from 'lib/styles/muiStyles'
import React, { Dispatch, useCallback } from 'react'

export type SearchBoxProps = {
  filter: Dispatch<string>
}

function SearchBox({ filter }: SearchBoxProps) {
  const [value, setValue] = useSearchInputState()

  const onChange = useCallback(
    (e) => {
      setValue(e.target.value)
      if (e.target.value === '') {
        filter('')
      }
    },
    [filter, setValue]
  )

  const onSearch = useCallback(
    (e) => {
      e.preventDefault()
      filter(value)
    },
    [filter, value]
  )

  const classes = useFocusOutlineStyle()

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
