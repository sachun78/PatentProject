import { Divider, FormControl, IconButton, InputBase, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Dispatch, useCallback } from 'react'
import { useSearchInputState } from 'atoms/searchInputState'
import { searchSelect } from '../Schedules'

export type SearchBoxProps = {
  filter: Dispatch<string>
  type: searchSelect
  setType: Dispatch<searchSelect>
  onTypeChange: (e: SelectChangeEvent) => void
}

function SearchBox({ filter, type, onTypeChange, setType }: SearchBoxProps) {
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
      // value 가 이메일 타입이 아닌경우
      filter(value)
      setType(type)
      setValue('')
    },
    [filter, setType, setValue, type, value]
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
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <FormControl sx={{ p: '4px' }}>
        <Select value={type} onChange={onTypeChange} style={{ borderRadius: '0.5rem', border: '1px solid #A1045A' }}>
          <MenuItem value={'title'}>Title & Comment</MenuItem>
          <MenuItem value={'email'}>Email</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  )
}

export default SearchBox
