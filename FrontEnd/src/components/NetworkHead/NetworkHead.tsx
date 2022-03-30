import {css} from "@emotion/react";

export type NetworkHeadProps = {}
function NetworkHead({}: NetworkHeadProps) {
    return <div css={HeadStyle}>My Network</div>
};
const HeadStyle = css`
    background-color: #f5f5f5;
    border-bottom: 1px solid #e3e3e3;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
`

export default NetworkHead
