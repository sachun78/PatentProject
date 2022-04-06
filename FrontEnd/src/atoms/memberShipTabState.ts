import { atom } from 'recoil'

export const eventSwitchState = atom({
  key: 'eventSwitchState',
  default: false
})

export const meetingSwitchState = atom({
  key: 'meetingSwitchState',
  default: false
})
