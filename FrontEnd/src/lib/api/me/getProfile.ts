import client from '../client'
import { IProfile } from '../types'
import { QueryFunctionContext } from 'react-query'

export async function getCurrentProfile() {
  const response = await client.get<IProfile>('/api/profile')
  return response.data
}

export async function getProfilebyEmail({ queryKey }: QueryFunctionContext) {
  const [_, email] = queryKey
  const response = await client.get<IProfile>('/api/profile', { params: { email } })
  return response.data
}

export async function patchProfile(req: IProfile) {
  const response = await client.patch<IProfile>('/api/profile/', req)
  return response.data
}
