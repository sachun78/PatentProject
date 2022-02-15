import client from '../client'
import { IProfile } from '../types'

export async function getCurrentProfile() {
  const response = await client.get<IProfile>('/api/profile')
  return response.data
}

export async function patchProfile(req: IProfile) {
  const response = await client.patch<IProfile>('/api/profile/update-profile', req)
  return response.data
}
