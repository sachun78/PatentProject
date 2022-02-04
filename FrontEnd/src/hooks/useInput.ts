import { useState } from 'react'

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  const [prevValue, setPrevValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(prevValue)
  }
  const prev_to_current = () => {
    setPrevValue(value)
  }

  return [value, onChange, reset, prev_to_current] as const
}
