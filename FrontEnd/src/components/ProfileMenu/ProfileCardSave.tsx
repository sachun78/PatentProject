import React from 'react'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import styled from '@emotion/styled'

export type ProfileCardSaveProps = {
  onSave: () => void
  loading: boolean
}

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: '1.875rem',
    borderRadius: '1rem',
    width: '9.375rem',
    height: '1.75rem',
    font: 'normal normal normal 14px/26px NanumSquareOTF',
    textTransform: 'none',
  },
}))

function ProfileCardSave({ onSave, loading }: ProfileCardSaveProps) {
  const classes = useStyle()
  return (
    <SaveBlock>
      <Button variant="contained" disabled={loading} onClick={onSave} classes={classes}>
        Save
      </Button>
    </SaveBlock>
  )
}

const SaveBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export default ProfileCardSave
