import { useQuery } from 'react-query'
import { getAllUser } from 'lib/api/buddy/getAllUser'
import { networkStyle } from './index'
import NetworkItem from './NetworkItem'
import NetworkSkeleton from './NetworkSkeleton'
import React from 'react'

export type BrowseUserProps = {}

function BrowseUser({}: BrowseUserProps) {
  const { data: allUser, isLoading } = useQuery('browse-user', getAllUser, {
    staleTime: 2000,
  })

  if (isLoading) {
    return (
      <div css={networkStyle}>
        {Array.from({ length: 6 }, (v, i) => i).map((v) => {
          return <NetworkSkeleton key={v} />
        })}
      </div>
    )
  }
  if (!allUser) return null

  return (
    <div css={networkStyle}>
      {allUser.map((user: any) => {
        return <NetworkItem key={user.email} data={user} />
      })}
    </div>
  )
}

export default BrowseUser
