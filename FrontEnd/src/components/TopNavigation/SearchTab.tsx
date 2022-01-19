import { css } from '@emotion/react'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'

export type SearchTabProps = {}

function SearchTab({}: SearchTabProps) {
  return <div css={wrapper}>
    <div className='search-container'>
      <div className='search-box'>
        <div className='search-inner'>
          <InputBase css={inputStyle}
                     placeholder='Search…'
                     inputProps={{ 'aria-label': 'search', 'height': '100%', 'width': '100%' }}
          />
        </div>
      </div>
    </div>
  </div>
}

const wrapper = css`
  display: flex;
  flex-grow: 2;
  flex-shrink: 1;
  align-items: center;
  justify-content: center;
  width: 100%;

  .search-container {
    flex-basis: 40rem;
    position: relative;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .search-box {
    min-width: 40rem;
    display: flex;
  }

  .search-inner {
    max-width: 40rem;
  }
`
const inputStyle = css`

  .MuiInputBase-input {

  }
`
export default SearchTab
