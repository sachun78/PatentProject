import { css } from '@emotion/react'
import React from 'react'
import NetworkHead from "../../components/NetworkHead";
import NetworkList from "../../components/NetworkList";

type NetworkProps = {}

function Network({}: NetworkProps) {

  return (
    <div css={wrapper}>
        <NetworkHead/>
        <NetworkList/>
    </div>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`

export default Network
