import { itemStyle, textStyle } from './styles'
import React from 'react'
import { Button } from '@mui/material'

export type ProfileCardSaveProps = {
  title: string
  onSave: () => void
  loading: boolean
}

function ProfileCardSave({ title, onSave, loading }: ProfileCardSaveProps) {
  return <div css={itemStyle}>
    <div className='inner'>
      <div className='title'>
        <label>{title}</label></div>
      <div css={textStyle}>
        <Button variant='contained' disabled={loading} onClick={onSave}>Save</Button>
      </div>
    </div>
  </div>
}

export default ProfileCardSave
