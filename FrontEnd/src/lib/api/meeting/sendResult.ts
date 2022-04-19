import client from '../client'

export default async function sendResult({
  status,
  meetingId,
}: {
  status: string
  meetingId: string
}) {
  const response = await client.post('/api/meeting/', { status, meetingId })
  return response.data
}
