import { css } from '@emotion/react'
import { Avatar, Grid, Tooltip } from '@mui/material'
import gravatar from 'gravatar'
import { API_PATH } from 'lib/api/client'
import { IProfile } from 'lib/api/types'
import getCountryName from 'lib/countryName'
import palette, { brandColor } from 'lib/palette'
import { FieldItem } from 'pages/User/styles'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

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
          style={{ border: '0.1px solid lightgray' }}
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
          <div>
            <img src="/assets/meeting.png" style={{ width: '1rem' }} alt={'meeting'} />            
          </div>
          <div>
            0                
          </div>
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

const itemStyle = css`
  display: flex;
  width: 100%;
  max-height: 6.875rem;
  height: 6.875rem;
  align-items: center;
  background: #fff;
  opacity: 0.7;
  border-radius: 0.5rem;
  padding: 1.5625rem 1.875rem;

  &:hover {
    color: ${brandColor};
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 5px 11px #00000029;
    cursor: pointer;
    opacity: 1;
  }

  & + & {
    margin-top: 0.5rem;
  }
`
const iconStyle = css`
  margin-right: 1.25rem;
`
const userStyle = css`
  //width: 13.625rem;
  flex: 2;
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
const informStyle = css`
  display: flex;
  //width: 28.125rem;
  flex: 3;
  height: 3.6875rem;
  flex-direction: column;
  font-size: 0.875rem;
  color: ${palette.grey[400]};

  svg {
    margin-right: 0.375rem;
    color: ${brandColor};
    font-size: 1rem;
  }

  span {
    display: flex;
    align-items: center;
  }
`
const stateStyle = css`
  width: 3.75rem;
  max-height: 3.75rem;
  height: 100%;
  float: right;
  background: #f2f2f2;
  text-align: center;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    color: #6c6c6c;
    font: normal normal normal 16px/18px NanumSquareOTF;
  }
`

export default memo(NetworkItem)
