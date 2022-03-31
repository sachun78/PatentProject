import mongoose from 'mongoose'

export interface INetwork {
  user_id: string
  networks: string[]
}

export const networkSchema = new mongoose.Schema<INetwork>({
  user_id: { type: String, required: true },
  networks: { type: [String] } //user's network array by ID
})

const network = mongoose.model('networks', networkSchema)

export function create(bodyData: any) {
  const new_network = new network(bodyData)
  return new_network.save()
}

export function saveNetworkUserAdd(bodyData: any, meetpeopleData: any) {
  return network.findOneAndUpdate({ email: bodyData }, { $push: { 'meetpeople': meetpeopleData } })
}
