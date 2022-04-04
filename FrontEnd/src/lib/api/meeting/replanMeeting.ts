import client from '../client'

type replanMeetingArgs = {
  location: string
  date?: Date
  time?: Date
  comment?: string
}

export async function replanMeeting(code: string, data: replanMeetingArgs) {
  const response = await client.patch('/api/meeting/replan/' + code, data)
  return response.data
}
