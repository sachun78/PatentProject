import { Skeleton } from '@mui/material'
import React from 'react'
import { iconStyle, itemStyle, userStyle } from './styles'

export type NetworkSkeletonProps = {}

function NetworkSkeleton({}: NetworkSkeletonProps) {
  return (
    <div css={itemStyle}>
      <div css={iconStyle}>
        <Skeleton variant="circular" width={60} height={60} />
      </div>
      <div css={userStyle}>
        <Skeleton variant="text" width={'100%'} height={30} />
        <Skeleton variant="text" width={'100%'} height={30} />
      </div>
    </div>
  )
}

export default NetworkSkeleton
