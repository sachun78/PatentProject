import { css } from '@emotion/react'
import NetworkItem from './NetworkItem'
import useBuddyQuery from 'hooks/query/useBuddyQuery'

export type NetworkListProps = {}

function NetworkList({}: NetworkListProps) {
  const { data, isLoading } = useBuddyQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  return <div css={networkStyle}>
    {data.map((buddy: any) => {
      return <NetworkItem key={buddy.id} />
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
