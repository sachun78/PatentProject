import { itemStyle } from './styles'
import React from 'react'
import { Button } from '@mui/material'

export type ProfileCardSaveProps = {
  onSave: () => void
  loading: boolean
}

function ProfileCardSave({ onSave, loading }: ProfileCardSaveProps) {
  return (
    <div css={itemStyle}>
      <div className="inner" style={{ justifyContent: 'flex-end' }}>
        <div className="title"></div>
        <Button variant="contained" disabled={loading} onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default ProfileCardSave
