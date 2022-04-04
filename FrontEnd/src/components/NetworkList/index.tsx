import {css} from "@emotion/react";
import NetworkItem from "./NetworkItem";

export type NetworkListProps = {}
function NetworkList({}: NetworkListProps) {
  return <div css={networkStyle}>
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
    <NetworkItem />
  </div>
};

const networkStyle= css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export default NetworkList
