import { useCallback, useState } from 'react'

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);
  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);
  return [value, onToggle, setValue] as [boolean, typeof onToggle, typeof setValue];
}
