import { css } from '@emotion/react'
import InfoViewSection from './InfoViewSection'
import InfoViewCard from './InfoViewCard'
import { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import { useField } from '../../hooks/useField'
import { useUserState } from '../../atoms/authState'
import { useProfileState } from '../../atoms/profileState'

export type InfoViewProps = {}

function InfoView({}: InfoViewProps) {
  const {
    field,
    fieldText,
    onChangeFieldText,
    add, remove, reset, save
  } = useField()
  const [profile] = useProfileState()
  const [country] = useState(profile?.country)
  const [user] = useUserState()
  const [company, onCompanyChange, resetCompany, prevCompany] = useInput(profile?.company || 'company is empty error', 'company')
  const [department, onDepartmentChange, resetDepartment, prevDepartment] = useInput(profile?.department || 'department ID', 'department')
  const [position, onPositionChange, resetPosition, prevPosition] = useInput(profile?.position || 'position ID', 'position')

  const handleFields = { onChange: onChangeFieldText, add, remove }

  return <div css={wrapper}>
    <InfoViewSection title='Account'>
      <InfoViewCard.Item title='Email' type={'email'} email={user?.email} />
      <InfoViewCard.Item title='Username' type={'username'} username={user?.username} />
      <InfoViewCard.Item title='Photo' type={'photo'} username={user?.username} isEditMode />
    </InfoViewSection>
    <InfoViewSection title='Belonging'>
      <InfoViewCard.Item title='Company' type={'text'} description={company} onChange={onCompanyChange}
                         reset={resetCompany} prevReset={prevCompany} />
      <InfoViewCard.Item title='Department' type={'text'} description={department} onChange={onDepartmentChange}
                         reset={resetDepartment} prevReset={prevDepartment} />
      <InfoViewCard.Item title='Position' type={'text'} description={position} onChange={onPositionChange}
                         reset={resetPosition} prevReset={prevPosition} />
      <InfoViewCard.Item title='Field' type={'field'} fields={field} handleField={handleFields} reset={reset}
                         prevReset={save}
                         description={fieldText} />
      <InfoViewCard.Item title='Country' type={'country'} countryValue={country} />
    </InfoViewSection>
    <InfoViewSection title='Additional'>
      <InfoViewCard.Item title='Prev Career' type={'career'} />
    </InfoViewSection>
  </div>
}

const wrapper = css`
  max-width: 90rem;
  padding-bottom: 2rem;
`

export default InfoView
