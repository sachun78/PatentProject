import { css } from '@emotion/react'
import palette from 'lib/palette'
import { Link } from 'react-router-dom'

export type ScheduleCardProps = {
  id: string
  from: string
  to: string
  comment: string
  place: string
  time: Date
  date: Date
  state: string
  title: string
  outdated?: boolean
}

function ScheduleCard({
  from,
  to,
  comment,
  place,
  time,
  date,
  state,
  id,
  title,
  outdated = false,
}: ScheduleCardProps) {
  return (
    <Link css={wrapper} to={'/membership/schedule/' + id}>
      <div css={headerStyle}>
        <h3>{title}</h3> &nbsp;
        <p>{to}</p>
      </div>
      <p css={commentStyle}>{comment}</p>
      <div css={bottomStyle}>
        <div className={'state-box'}>
          <span>
            {state}
            {outdated && state === 'none' ? '/expired' : ''}
          </span>
        </div>
        <div>
          {place} &nbsp;
          {new Date(date).toLocaleDateString()}
          {new Date(time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </Link>
  )
}

export const wrapper = css`
  height: 15.5rem;
  background: rgba(255, 255, 255, 0.5);
  width: calc(50% - 3rem);
  min-width: 37.5rem;
  margin-right: 1.25rem;
  margin-bottom: 1.5625rem;
  padding: 1.875rem 1.875rem 0;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden; //Text overflow
  transition: background-color 0.25s ease-in 0s;
  color: #333333;
  text-decoration: none;

  &:hover {
    border: 1px solid ${palette.grey[300]};
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 5px 11px #00000029;

    h3 {
      color: #a1045a;
      margin: 5px 0 0.9375rem;
    }
  }

  h3 {
    font: normal normal 800 20px/23px 'NanumSquareOTF';
    margin: 5px 0 0.9375rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
export const commentStyle = css`
  color: #6c6c6c;
  font: normal normal normal 15px/17px 'NanumSquareOTF';
  word-break: break-all;
  margin: 0;
  min-height: 111px;
  height: 100%;
`
export const bottomStyle = css`
  height: 100%;
  box-shadow: inset 0 calc(1 * 1px) 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: #6c6c6c;
  font: normal normal normal 16px/18px NanumSquareOTF;

  .state-box {
    height: 1.5rem;
    padding-left: 15px;
    padding-right: 15px;

    background: #a1045a;
    border: 1px solid #d9d9d9;
    border-radius: 12px;

    span {
      color: #fff;
      font: normal normal normal 15px/17px NanumSquareOTF;
    }
  }
`
export const headerStyle = css`
  display: flex;
  justify-content: space-between;
`

export default ScheduleCard
