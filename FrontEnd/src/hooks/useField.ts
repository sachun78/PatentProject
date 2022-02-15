import React, { useState } from 'react'
import { useProfileState } from '../atoms/profileState'
import { patchProfile } from '../lib/api/me/getProfile'

export function useField() {
  const [profile, setProfile] = useProfileState()
  const [fieldText, setFieldText] = useState('')
  const [fields, setFields] = useState(profile?.field)
  const [prevFields, setPrevFields] = useState(profile?.field)

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
  const save = async () => {
    if (fields === undefined) return
    try {
      const result = await patchProfile({ field: fields })
      if (result) {
        setProfile(result)
        setPrevFields(result.field)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    field: fields, fieldText, onChangeFieldText, remove, add, reset, save
  }
}
