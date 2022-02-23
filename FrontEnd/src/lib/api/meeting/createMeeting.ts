import client from '../client'

export async function createMeeting(input: MeetingInput) {
  const response = await client.post('/api/meeting/send-invitemail', {
    ...input
  })
  return response.data
}

type MeetingInput = {
  title: string
  eventId: string
  toEmail: string
  date: Date
  time: Date
  location: string
  comment: string
}
