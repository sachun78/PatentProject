import client from '../client'

export default async function patchStatusMeeting({ status, meetingId }: { status: string; meetingId: string }) {
  const response = await client.patch(`/api/meeting/${meetingId}`, { status })
  return response.data
}
