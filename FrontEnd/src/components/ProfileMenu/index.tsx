import InfoViewSection from './ProfileSection'
import InfoViewCard from './ProfileCard'
import ProfileCard from './ProfileCard'
import { useMutation, useQueryClient } from 'react-query'
import { User } from 'lib/api/types'
import useProfileQuery from 'hooks/query/useProfileQuery'
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { AutocompleteValue } from '@mui/material'
import { CountryType } from '../CountrySelector/CountrySelector'
import _ from 'lodash'
import { patchProfile } from 'lib/api/me/getProfile'
import { InfoStyleDiv } from 'pages/Profile/styles'
import { useProfileFormState } from 'atoms/profileFormState'
import useInput from 'hooks/useInput'

export type ProfileMenuProps = {}

function ProfileMenu({}: ProfileMenuProps) {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')

  const { data, isLoading } = useProfileQuery()

  const [company, setCompany] = useState(data?.company)
  const [department, setDepartment] = useState(data?.department)
  const [position, setPosition] = useState(data?.position)
  const [signature, onChangeSignature, setSignature] = useInput(data?.signature)
  const [country, setCountry] = useState(data?.country ?? 'KR')
  const [phone, setPhone] = useProfileFormState()

  const [fields, setFields] = useState<string[]>(data?.field ?? [])
  const [fieldText, setFieldText] = useState('')

  const difference = useMemo(() => _.isEqual(fields, data?.field), [data, fields])
  const isSaveActive = useMemo(
    () =>
      data?.company !== company ||
      phone !== data?.phone ||
      data?.department !== department ||
      data?.position !== position ||
      !difference ||
      country !== data?.country ||
      signature !== data?.signature,
    [
      company,
      country,
      data?.company,
      data?.country,
      data?.department,
      data?.phone,
      data?.position,
      data?.signature,
      department,
      difference,
      phone,
      position,
      signature,
    ]
  )

  const onChangeFieldText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldText(e.target.value)
  }, [])

  const saveMutation = useMutation(patchProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
      window.location.reload()
    },
    onError: (e) => {
      console.error(e)
    },
  })

  useEffect(() => {
    setCompany(data?.company)
    setDepartment(data?.department)
    setPosition(data?.position)
    setFields(data?.field ?? [])
    setCountry(data?.country ?? 'KR')
    setPhone(data?.phone ?? '')
    setSignature(data?.signature ?? '')
  }, [data])

  const onFieldRemove = useCallback((tag_name: string) => {
    setFields((prevFields) => prevFields.filter((v) => v !== tag_name))
  }, [])

  const onFieldAdd = useCallback(() => {
    if (!fieldText && !fieldText.trim()) return
    const result = fields.find((value) => value === fieldText)
    if (result === undefined) {
      setFields([...fields, fieldText])
      setFieldText('')
    }
  }, [fieldText, fields])

  const handleCountry = useCallback(
    (e: SyntheticEvent, v: AutocompleteValue<CountryType, undefined, undefined, undefined>) => {
      if (!v) return
      setCountry(v.code)
    },
    []
  )

  const onCompanyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value)
  }, [])

  const onDepartmentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value)
  }, [])

  const onPositionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value)
  }, [])

  const onSaveProfile = useCallback(() => {
    saveMutation.mutate({
      company,
      department,
      position,
      field: fields,
      country,
      phone,
      signature,
    })
  }, [saveMutation, company, department, position, fields, country, phone, signature])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <InfoStyleDiv>
      <InfoViewSection title="Account">
        <InfoViewCard.Item title="Email" type={'email'} email={user?.email} />
        <InfoViewCard.Item title="Username" type={'username'} username={user?.username} />
        <InfoViewCard.Item title="Photo" type={'photo'} email={user?.email} isEditMode />
        <ProfileCard.Phone title="Phone number" phone={phone} />
      </InfoViewSection>
      <InfoViewSection title="Belonging" description={'Change identifying details for your connecting'}>
        <ProfileCard.Text title="Firm" text={company ?? ''} onChange={onCompanyChange} />
        <ProfileCard.Text title="Department" text={department ?? ''} onChange={onDepartmentChange} />
        <ProfileCard.Text title="Position" text={position ?? ''} onChange={onPositionChange} />
        <ProfileCard.Field
          title="Field"
          text={fieldText}
          onChange={onChangeFieldText}
          onAdd={onFieldAdd}
          fields={fields}
          onRemove={onFieldRemove}
        />
        <ProfileCard.Country title="Country" onChange={handleCountry} country={country ?? 'AD'} />
        <ProfileCard.Text title="Default Comment" text={signature ?? ''} onChange={onChangeSignature} multiline />
        <ProfileCard.Save onSave={onSaveProfile} loading={!isSaveActive || saveMutation.isLoading} />
      </InfoViewSection>
    </InfoStyleDiv>
  )
}

export default ProfileMenu
