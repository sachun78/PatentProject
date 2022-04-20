import client from '../client'

export async function createMeetingResult({
  id,
  result,
  status,
}: {
  id: string
  result: string
  status: boolean
}) {
  const res = await client.post('/api/mhistory/' + id, {
    result,
    status,
  })
  return res.data
}
