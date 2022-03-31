import { itemStyle, textStyle } from './styles'
import React from 'react'
import { Button } from '@mui/material'

export type ProfileCardSaveProps = {
  title: string
  active: boolean
  onSave: () => void
  loading: boolean
}

function ProfileCardSave({ title, active, onSave, loading }: ProfileCardSaveProps) {
  return <div css={itemStyle}>
    <div className='inner'>
      <div className='title'>
        <label>{title}</label></div>
      <div css={textStyle}>
        <Button variant='contained' disabled={!active || loading} onClick={onSave}>Save</Button>
      </div>
    </div>
  </div>
}

export default ProfileCardSave
