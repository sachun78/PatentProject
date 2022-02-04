import React, { useState } from 'react'

export function useField(defaultField: string[] = []) {
  const [fieldText, setFieldText] = useState('')
  const [fields, setFields] = useState(defaultField)
  const [prevFields, setPrevFields] = useState(defaultField)

  const onChangeFieldText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldText(e.target.value)
  }
  const remove = (e: React.MouseEvent<SVGSVGElement>) => {
    const name = e.currentTarget.getAttribute('name')
    setFields(fields?.filter(v => v !== name))
  }
  const add = () => {
    if (fields === undefined) return
    if (fieldText === undefined) return
    const result = fields.find((value) => value === fieldText)
    if (result === undefined) {
      setFields([...fields, fieldText])
      setFieldText('')
      return
    }
  }

  const reset = () => {
    setFields(prevFields)
  }
  const save = () => {
    setPrevFields(fields)
  }

  return {
    fields, fieldText, onChangeFieldText, remove, add, reset, save
  }
}
