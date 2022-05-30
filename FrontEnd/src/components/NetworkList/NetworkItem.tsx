import { css } from '@emotion/react'
import { Avatar, Grid, Tooltip } from '@mui/material'
import gravatar from 'gravatar'
import { API_PATH } from 'lib/api/client'
import { IProfile } from 'lib/api/types'
import getCountryName from 'lib/countryName'
import { FieldItem } from 'pages/User/styles'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { iconStyle, informStyle, itemStyle, stateStyle, userStyle } from './styles'
import IconControl from '../IconControl'

export type NetworkItemProps = {
  data: { email: string; profile: IProfile; name: string; username?: string }
}

function NetworkItem({ data }: NetworkItemProps) {
  const navigate = useNavigate()

  return (
    <div css={itemStyle} onClick={() => navigate('/u/' + data.email)}>
      <div css={iconStyle}>
        <Avatar
          alt="user-avatar"
          src={API_PATH + 'static/' + data.email}
          sx={{ width: 60, height: 60 }}
          style={{ border: '1px solid lightgray' }}
          imgProps={{ crossOrigin: 'anonymous' }}
        >
          <img src={gravatar.url(data.email, { s: '60px', d: 'retro' })} alt={'fallback-img'} />
        </Avatar>
      </div>
      <div css={userStyle}>
        <div css={nameStyle}>{data.name || data.username}</div>
        <div css={emailStyle}>{data.email}</div>
      </div>
      <div css={informStyle}>
        <div css={companyBoxStyle}>
          <Tooltip title="Company" placement={'top'}>
            <span>
              <img src="/assets/company.png" alt={'company'} />
              {data.profile.company}
            </span>
          </Tooltip>
          {data.profile.country && (
            <Tooltip title="Country" placement={'top'}>
              <span>
                <img src="/assets/country.png" alt={'country'} />
                {getCountryName(data.profile.country)}
              </span>
            </Tooltip>
          )}
        </div>
        <Tooltip title="Field" placement={'left'}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid container>
              {data.profile.field?.map((elem: string) => (
                <FieldItem key={elem} color="#1E3560">
                  {elem}
                </FieldItem>
              ))}
            </Grid>
          </div>
        </Tooltip>
      </div>
      <Tooltip title="Wemet" placement={'left'}>
        <div css={stateStyle}>
          <IconControl name={'invite'} />
        </div>
      </Tooltip>
    </div>
  )
}

const companyBoxStyle = css`
  display: flex;
  flex-direction: row;
  color: #6c6c6c;
  margin-bottom: 1.0625rem;

  span + span {
    margin-left: 1.6875rem;
  }

  span img {
    width: 1.375rem;
    margin-right: 6px;
  }
`

const nameStyle = css`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.3125rem;
  color: #333333;
`
const emailStyle = css`
  color: #9c9c9c;
`

export default memo(NetworkItem)
