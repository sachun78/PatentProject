import { css } from '@emotion/react'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import NetworkItem from './NetworkItem'

export type NetworkListProps = {}

function NetworkList({}: NetworkListProps) {
  const { data: buddyData, isLoading } = useBuddyQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!buddyData || buddyData.length === 0) {
    return <div>No data</div>
  }

  return <div css={networkStyle}>
    {buddyData.buddy.map((buddy: any) => {
      return <NetworkItem key={buddy.email} data={buddy} />
    })}
    {/*<NetworkItem key={buddyData.buddy[0].email} data={buddyData.buddy[0]} />*/}
    {/*<NetworkItem key={buddyData.buddy[0].email} data={buddyData.buddy[0]} />*/}
  </div>
}

const networkStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  max-width: 60rem;
`

export default NetworkList
