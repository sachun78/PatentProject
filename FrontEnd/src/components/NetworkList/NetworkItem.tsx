import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'
import { IProfile } from 'lib/api/types'
import { useNavigate } from 'react-router-dom'
import { Avatar, Grid, Tooltip } from '@mui/material'
import gravatar from 'gravatar'
import React, { memo } from 'react'
import { MdOutlineSafetyDivider, MdOutlineWork } from 'react-icons/md'
import { FieldItem } from 'pages/User/styles'
import getCountryName from 'lib/countryName'
import randomColor from 'randomcolor'
import { BsFilePerson } from 'react-icons/bs'
import { API_PATH } from '../../lib/api/client'

export type NetworkItemProps = {
  data: { email: string; profile: IProfile; name: string }
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
        <div css={nameStyle}>{data.name}</div>
        <div css={emailStyle}>{data.email}</div>
      </div>
      <div css={informStyle}>
        <div css={companyBoxStyle}>
          <Tooltip title="Company" placement={'left'}>
            <span>
              <img src="/assets/company.png" style={{ width: '1rem', marginRight: '0.5rem' }} />
              {data.profile.company}
            </span>
          </Tooltip>
          <Tooltip title="Country" placement={'left'}>
            <span style={{width: '9rem'}}>
              <img src="/assets/country.png" style={{ width: '1rem', marginRight: '0.5rem' }} />
              {getCountryName(data.profile.country!)}
            </span>
          </Tooltip>
        </div>
        <Tooltip title="Field" placement={'left'}>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <Grid container>
              {data.profile.field?.map((elem: string) => (
                <FieldItem key={elem} color="#123560" style={{ borderRadius: '1rem'}}>
                  {elem}
                </FieldItem>
              ))}
            </Grid>
          </div>
        </Tooltip>
      </div>
      <div css={stateStyle}>
        <div>
          <img src="/assets/meeting.png" style={{ width: '1rem'}} />
        </div>
        <div>0</div>
      </div>
    </div>
  )
}

const companyBoxStyle = css`
  display: flex;
  flex-direction: row;
  color: #6c6c6c;
  margin-bottom: 0.5rem;
`

const itemStyle = css`
  display: flex;
  width: 100%;
  max-height: 5.625rem;
  height: 5.625rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.5rem;
  padding: 0.75rem;

  &:hover {
    color: ${brandColor};
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.5rem 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  & + & {
    margin-top: 0.5rem;
  }
`
const iconStyle = css`
  margin-right: 1rem;
  margin-left: 0.5rem;
`
const userStyle = css`
  margin-right: 1.5rem;
  max-width: 20rem;
  min-width: 20rem;
  flex: 1;
`
const nameStyle = css`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.125rem;
  color: #333333;
`
const emailStyle = css`
  color: #9c9c9c;
`
const informStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 0.875rem;
  color: ${palette.grey[400]};

  svg {
    margin-right: 0.5rem;
    color: ${brandColor};
    font-size: 1rem;
  }

  span {
    width: 7rem;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
  }
`
const stateStyle = css`
  display: relative
  width: 3rem;
  min-width: 3rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  font-size: 0.5rem;  
  background: #f2f2f2;
  text-align: center;
  border-radius: 0.5rem;
  .request-block {
    margin-right: 1rem;
  }
`

export default memo(NetworkItem)
