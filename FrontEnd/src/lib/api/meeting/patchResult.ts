import client from '../client'

export default async function patchResult({ result, meetingId }: { result: string; meetingId: string }) {
  const response = await client.patch(`/api/mhistory/${meetingId}`, { result })
  return response.data
}
