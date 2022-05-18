import client from '../client'

export async function updateMeeting({ meetingId, status }: { meetingId: string; status: string }) {
  const response = await client.post('/api/meeting/send-resultmail', {
    meetingId,
    status,
  })
  return response.data
}

export async function changeMeeting(Input: {
  meetingId: string
  location: string
  comment: string
  startTime: Date
  endTime: Date
}) {
  const response = await client.post(
    '/api/meeting/send-invitemail',
    {
      location: Input.location,
      comment: Input.comment,
      startTime: Input.startTime,
      endTime: Input.endTime,
    },
    {
      params: {
        meetId: Input.meetingId,
      },
    }
  )
  return response.data
}
