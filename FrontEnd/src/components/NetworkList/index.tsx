import { css } from '@emotion/react'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import NetworkItem from './NetworkItem'
import { IBuddy } from 'lib/api/types'
import { noScheduleStyle } from '../Events/styles'
import React from 'react'

export type NetworkListProps = {}

function NetworkList({}: NetworkListProps) {
  const { data: buddyData, isLoading } = useBuddyQuery()

  if (isLoading) {
    return (
      <div css={noScheduleStyle}>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!buddyData || buddyData.length === 0 || !buddyData.buddy || buddyData.buddy.length === 0) {
    return (
      <div css={noScheduleStyle}>
        <h1>empty</h1>
      </div>
    )
  }

  return (
    <div css={networkStyle}>
      {buddyData.buddy.map((buddy: IBuddy) => {
        return <NetworkItem key={buddy.email} data={buddy} />
      })}
    </div>
  )
}

export const networkStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  width: 54.375rem;
`

export default NetworkList
