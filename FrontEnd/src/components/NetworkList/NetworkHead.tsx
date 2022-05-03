import { css } from '@emotion/react'
import { brandColor } from 'lib/palette'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNetworkModalState } from '../../atoms/networkState'

export type NetworkHeadProps = {}

function NetworkHead({}: NetworkHeadProps) {
  const [, setOpen] = useNetworkModalState()
  return (
    <div css={HeadStyle}>
      <h1>Network</h1>
      <IconButton
        sx={{ p: '8px' }}
        aria-label="search-network"
        onClick={() => {
          setOpen(true)
        }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  )
}

const HeadStyle = css`
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 1.25rem;
    color: ${brandColor};
  }

  max-width: 60rem;
  margin-right: 1rem;
  display: flex;
  justify-content: space-between;
`

export default NetworkHead
