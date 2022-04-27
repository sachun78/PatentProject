import client from '../client'

export async function createMeetingResult({
  id,
  result,
  status,
  photopath,
}: {
  id: string
  result: string
  status: boolean
  photopath?: string
}) {
  const res = await client.post('/api/mhistory/' + id, {
    result,
    status,
    photopath,
  })
  return res.data
}
