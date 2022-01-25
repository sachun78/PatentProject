import React, { useState } from 'react'

export default function useBelongingState(description: string = '', fields: string[] = []) {
  const [prevValue, setPrevValue] = useState(description)
  const [currentText, setCurrentText] = useState(description)
  const [prevFields, setPrevFields] = useState(fields)
  const [currentFields, setCurrentFields] = useState(fields)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value)
  }
}
