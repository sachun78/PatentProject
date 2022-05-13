import client from '../client'

export async function updateMeeting({ meetingId, status }: { meetingId: string; status: string }) {
  const response = await client.post('/api/meeting/send-resultmail', {
    meetingId,
    status,
  })
  return response.data
}
