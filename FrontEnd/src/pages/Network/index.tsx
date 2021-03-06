import { css } from '@emotion/react'
import React from 'react'
import NetworkList from 'components/NetworkList'
import NetworkHead from 'components/NetworkList/NetworkHead'
import { Navigate, Route, Routes } from 'react-router-dom'
import BrowseUser from 'components/NetworkList/BrowseUser'
import { Helmet } from 'react-helmet-async'

type NetworkProps = {}

function Network({}: NetworkProps) {
  return (
    <div css={wrapper}>
      <Helmet>
        <title>Network - WEMET</title>
      </Helmet>
      <NetworkHead />
      <Routes>
        <Route path={'/my'} element={<NetworkList />} />
        <Route path={'/browse'} element={<BrowseUser />} />
        <Route path={'*'} element={<Navigate to={'my'} />} />
      </Routes>
    </div>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: column;
`

export default Network
