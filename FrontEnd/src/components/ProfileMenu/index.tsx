import { css } from '@emotion/react'
import InfoViewSection from './ProfileSection'
import InfoViewCard from './ProfileCard'
import { useInput } from '../../hooks/useInput'
import { useField } from '../../hooks/useField'
import { useQueryClient } from 'react-query'
import { User } from '../../lib/api/types'
import useProfileQuery from '../../hooks/query/useProfileQuery'

export type ProfileMenuProps = {}

function ProfileMenu({}: ProfileMenuProps) {
  const {
    field, fieldText,
    onChangeFieldText, add, remove, reset, save
  } = useField()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>('user')
  const { data } = useProfileQuery()

  const [company, onCompanyChange, resetCompany, prevCompany] = useInput(data?.company || 'company is empty error', 'company')
  const [department, onDepartmentChange, resetDepartment, prevDepartment] = useInput(data?.department || 'department ID', 'department')
  const [position, onPositionChange, resetPosition, prevPosition] = useInput(data?.position || 'position ID', 'position')

  const handleFields = { onChange: onChangeFieldText, add, remove }

  return <div css={wrapper}>
    <InfoViewSection title='Account'>
      <InfoViewCard.Item title='Email' type={'email'} email={user?.email} />
      <InfoViewCard.Item title='Username' type={'username'} username={user?.username} />
      <InfoViewCard.Item title='Photo' type={'photo'} email={user?.email} photo={user?.photo_path} isEditMode />
    </InfoViewSection>
    <InfoViewSection title='Belonging'>
      <InfoViewCard.Text title='Company' text={company} onChange={onCompanyChange} />
      <InfoViewCard.Text title='Department' text={department} onChange={onDepartmentChange} />
      <InfoViewCard.Text title='Position' text={position} onChange={onPositionChange} />
      <InfoViewCard.Item title='Field' type={'field'} fields={field} handleField={handleFields}
                         reset={reset} prevReset={save} description={fieldText} />
      <InfoViewCard.Item title='Country' type={'country'} countryValue={data?.country} />
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

export default ProfileMenu
