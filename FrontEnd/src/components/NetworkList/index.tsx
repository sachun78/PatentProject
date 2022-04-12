import { css } from '@emotion/react'
import useBuddyQuery from 'hooks/query/useBuddyQuery'
import NetworkItem from './NetworkItem'

export type NetworkListProps = {}

function NetworkList({}: NetworkListProps) {
  const { data: buddyData, isLoading } = useBuddyQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!buddyData) {
    return <div>No data</div>
  }

  return <div css={networkStyle}>
    {buddyData.buddy.map((buddy: any) => {
      return <NetworkItem key={buddy.id} data={buddy} />
    })}
  </div>
}

const networkStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export default NetworkList
