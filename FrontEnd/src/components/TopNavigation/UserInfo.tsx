import { css } from '@emotion/react'

export type UserInfoProps = {}
function UserInfo({}: UserInfoProps) {
    return <div css={wrapper}>UserInfo</div>
};

const wrapper = css`
    flex-grow: 1;
    flex-shrink: 2;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export default UserInfo
