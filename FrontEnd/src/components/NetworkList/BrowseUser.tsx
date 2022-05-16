import { useQuery } from 'react-query'
import { getAllUser } from 'lib/api/buddy/getAllUser'
import { networkStyle } from './index'
import NetworkItem from './NetworkItem'

export type BrowseUserProps = {}

function BrowseUser({}: BrowseUserProps) {
  const { data: allUser, isLoading } = useQuery('browse-user', getAllUser, {
    staleTime: 2000,
  })

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
