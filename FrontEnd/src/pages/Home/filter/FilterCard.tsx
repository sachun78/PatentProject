import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { MdFilterList } from 'react-icons/md';

export type filterCardProps = {
  onFilter: Function
}

function FilterCard({ onFilter }: filterCardProps) {

  const onClickFilter = () => {
    onFilter()
  }

  return (
    <div css={containerStyle}>
    <div style={{ flex: 4}}></div>
    <Stack direction="row" css={cardStyle} spacing={1}>           
      <Button        
        variant="outlined"  
        endIcon={<MdFilterList />} 
        style={{ 
          background: "rgba(255, 255, 255, 0.8)",
          border: "none",
          borderRadius: "0.5rem",
          fontWeight: "bold"         
        }}
        onClick={onClickFilter}
      >
        Nation
      </Button>        
    </Stack>
    </div>
  )
}

export default FilterCard

const containerStyle = css`
  position: absolute;
  max-width: 54.375rem;
  min-height: 2rem;
  margin-top: 2.5rem;  
  margin-bottom: 0.5rem;
  top: -1px;  
  display: flex
  
`


const cardStyle = css`
  flex: 1
  height: 100%
`