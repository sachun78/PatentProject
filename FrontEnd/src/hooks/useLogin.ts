import {
  LoginValue,
  toggleLoginType,
  updateLoginState,
  useLoginState,
} from '../atoms/loginState'

export default function useSetLogin(value: any, type: keyof LoginValue) {
  const [, setLogin] = useLoginState()

  return () => setLogin((state) => updateLoginState(state!, type, value))
}

export function useToggleLoginType() {
  const [, setLogin] = useLoginState()

  return () => setLogin((state) => toggleLoginType(state!, 'loginType'))
}

export function useLoginValue() {
  const [Login] = useLoginState()

  return Login
}
