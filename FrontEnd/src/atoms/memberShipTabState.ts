import { atom } from 'recoil'

export const memberShipTabState = atom<number>({
  key: 'memberShipTabState',
  default: 0
})

export const eventSwitchState = atom({
  key: 'eventSwitchState',
  default: false
})

export const meetingSwitchState = atom({
  key: 'meetingSwitchState',
  default: false
})
