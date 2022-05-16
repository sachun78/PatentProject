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
  )
}

export default FilterCard

const cardStyle = css`
  position: absolute
  right: 0
`