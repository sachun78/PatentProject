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
  data: { email: string; profile: IProfile }
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
      <div css={nameStyle}>{data.email}</div>
      <div css={informStyle}>
        <Tooltip title="Company" placement={'left'}>
          <span>
            <MdOutlineWork />
            {data.profile.company}
          </span>
        </Tooltip>
        <Tooltip title="Field" placement={'left'}>
          <span>
            <BsFilePerson />
            <Grid container>
              {data.profile.field?.map((elem: string) => (
                <FieldItem
                  key={elem}
                  color={randomColor({
                    hue: brandColor,
                    format: 'rgb', // e.g. 'rgb(225,200,20)'
                    seed: elem,
                  })}
                >
                  {elem}
                </FieldItem>
              ))}
            </Grid>
          </span>
        </Tooltip>
        <Tooltip title="Country" placement={'left'}>
          <span>
            <MdOutlineSafetyDivider />
            {getCountryName(data.profile.country!)}
          </span>
        </Tooltip>
      </div>
      <div css={stateStyle}>
        <span>WEMET(count)</span>
      </div>
    </div>
  )
}

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
const nameStyle = css`
  margin-right: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  max-width: 20rem;
  min-width: 20rem;
  flex: 1;
`

const informStyle = css`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  color: ${palette.grey[400]};

  svg {
    margin-right: 0.5rem;
    color: ${brandColor};
    font-size: 1rem;
  }

  span {
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
  }
`
const stateStyle = css`
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  flex-grow: 1;
  text-align: right;
  justify-content: flex-end;

  span + span {
    margin-left: 1rem;
  }

  .request-block {
    margin-right: 1rem;
  }
`

export default memo(NetworkItem)
