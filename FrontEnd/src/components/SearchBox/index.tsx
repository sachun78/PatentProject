import { IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Dispatch, useCallback } from 'react'
import { useSearchInputState } from 'atoms/searchInputState'

export type SearchBoxProps = {
  filter: Dispatch<string>
}

function SearchBox({ filter }: SearchBoxProps) {
  const [value, setValue] = useSearchInputState()

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

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: '1rem' }}
      onSubmit={onSearch}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Schedules..."
        value={value}
        onChange={onChange}
        inputProps={{ 'aria-label': 'search schedule' }}
      />
      <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBox
