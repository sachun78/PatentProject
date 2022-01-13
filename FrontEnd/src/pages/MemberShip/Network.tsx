import { css } from '@emotion/react'
import React from 'react'
import MyNetwork from '../../components/MyNetwork'
import useSelectMenu from '../../hooks/useSelectMenu'

type NetworkProps = {}

function Network({}: NetworkProps) {

  return (
    <div css={wrapper}>
      <MyNetwork />
    </div>
  )
}

const wrapper = css`
  display: flex;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

export default Network
