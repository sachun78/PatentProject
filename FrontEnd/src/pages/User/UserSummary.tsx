import { Field, FieldItem, Middle, Summary, UserBody } from './styles'
import { Grid, Tooltip } from '@mui/material'
import getCountryName from 'lib/countryName'
import React from 'react'
import { useQuery } from 'react-query'
import { getProfilebyEmail } from 'lib/api/me/getProfile'

export type UserSummaryProps = {
  email: string
}

function UserSummary({ email }: UserSummaryProps) {
  const { data: profileData, isLoading: isLoadingProfile } = useQuery(['profile', email], getProfilebyEmail, {
    retry: false,
    staleTime: 5000,
  })

  if (!profileData || isLoadingProfile) return null
  return (
    <UserBody>
      <Middle>
        <Summary>
          <h3>Summary</h3>
          <Tooltip title="Company" placement={'left'}>
            <span>
              <img src={'/assets/company.png'} alt={'company'} />
              {profileData.company}
            </span>
          </Tooltip>
          <Tooltip title="Position" placement={'left'}>
            <span>
              <img src={'/assets/position.png'} alt={'Position'} />
              {profileData.position}
            </span>
          </Tooltip>
          <Tooltip title="Department" placement={'left'}>
            <span>
              <img src={'/assets/department.png'} alt={'Department'} /> {profileData.department}
            </span>
          </Tooltip>
          <Tooltip title="Country" placement={'left'}>
            <span>
              <img src={'/assets/country.png'} alt={'Country'} /> {getCountryName(profileData.country!)}
            </span>
          </Tooltip>
          <Tooltip title="Wemet" placement={'left'}>
            <span>
              <img src={'/assets/meeting.png'} alt={'Wemet'} /> 0
            </span>
          </Tooltip>
        </Summary>
        <Field>
          <h3>Field</h3>
          <Grid container>
            {profileData.field?.map((elem: string) => {
              return (
                <FieldItem key={elem} color={'#1E3560'}>
                  {elem}
                </FieldItem>
              )
            })}
          </Grid>
        </Field>
      </Middle>
      <div className="History">
        <h3>Relative Meeting</h3>
      </div>
    </UserBody>
  )
}

export default UserSummary
