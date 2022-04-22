import InfoViewSection from './ProfileSection'
import InfoViewCard from './ProfileCard'
import ProfileCard from './ProfileCard'
import { useMutation, useQueryClient } from 'react-query'
import { User } from 'lib/api/types'
import useProfileQuery from 'hooks/query/useProfileQuery'
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { AutocompleteValue } from '@mui/material'
import { CountryType } from '../CountrySelector/CountrySelector'
import { css } from '@emotion/react'
import _ from 'lodash'
import { patchProfile } from 'lib/api/me/getProfile'

export type ProfileMenuProps = {}

function ProfileMenu({}: ProfileMenuProps) {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')

  const { data, isLoading } = useProfileQuery()

  const [company, setCompany] = useState(data?.company)
  const [department, setDepartment] = useState(data?.department)
  const [position, setPosition] = useState(data?.position)
  const [country, setCountry] = useState(data?.country ?? 'KR')

  const [fields, setFields] = useState<string[]>(data?.field ?? [])
  const [fieldText, setFieldText] = useState('')

  const company_default = useMemo(() => data?.company, [data])
  const department_default = useMemo(() => data?.department, [data])
  const position_default = useMemo(() => data?.position, [data])

  const difference = useMemo(
    () => _.difference(data?.field, fields),
    [data, fields]
  )
  const isSaveActive =
    company_default !== company ||
    department_default !== department ||
    position_default !== position ||
    difference.length > 0 ||
    country !== data?.country
  const onChangeFieldText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldText(e.target.value)
    },
    []
  )

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
    (
      e: SyntheticEvent,
      v: AutocompleteValue<CountryType, undefined, undefined, undefined>
    ) => {
      if (!v) return
      setCountry(v.code)
    },
    []
  )

  const onCompanyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCompany(e.target.value)
    },
    []
  )

  const onDepartmentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDepartment(e.target.value)
    },
    []
  )

  const onPositionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPosition(e.target.value)
    },
    []
  )

  const onSaveProfile = useCallback(() => {
    saveMutation.mutate({
      company,
      department,
      position,
      field: fields,
      country,
    })
  }, [company, country, department, fields, position, saveMutation])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div css={wrapper}>
      <InfoViewSection title="Account">
        <InfoViewCard.Item title="Email" type={'email'} email={user?.email} />
        <InfoViewCard.Item
          title="Username"
          type={'username'}
          username={user?.username}
        />
        <InfoViewCard.Item
          title="Photo"
          type={'photo'}
          email={user?.email}
          photo={user?.photo_path}
          isEditMode
        />
      </InfoViewSection>
      <InfoViewSection
        title="Belonging"
        description={'Change identifying details for your connecting'}
      >
        <ProfileCard.Text
          title="company"
          text={company ?? ''}
          onChange={onCompanyChange}
        />
        <ProfileCard.Text
          title="department"
          text={department ?? ''}
          onChange={onDepartmentChange}
        />
        <ProfileCard.Text
          title="position"
          text={position ?? ''}
          onChange={onPositionChange}
        />
        <ProfileCard.Field
          title="field"
          text={fieldText}
          onChange={onChangeFieldText}
          onAdd={onFieldAdd}
          fields={fields}
          onRemove={onFieldRemove}
        />
        <ProfileCard.Country
          title="country"
          onChange={handleCountry}
          country={country ?? 'AD'}
        />
        <ProfileCard.Save
          onSave={onSaveProfile}
          loading={!isSaveActive || saveMutation.isLoading}
        />
      </InfoViewSection>
      <InfoViewSection title="Additional">
        <InfoViewCard.Item title="Previous company" type={'career'} />
      </InfoViewSection>
    </div>
  )
}

const wrapper = css`
  max-width: 90rem;
  padding-bottom: 2rem;
`

export default ProfileMenu
