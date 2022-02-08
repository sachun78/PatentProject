import { css } from '@emotion/react'
import palette from '../../lib/palette'

export type ScheduleCardProps = {
  from: string
  to: string
  comment: string
  place: string
  time: string
  date: string
}

function ScheduleCard({ from, to, comment, place, time, date }: ScheduleCardProps) {
  return <div css={wrapper}>
    <div css={headerStyle}>
      <h3>Schedule Event Title</h3>
      <p className='from'>from<span> {from} </span></p>
      <p className='to'>to <span> {to}</span></p>
    </div>
    <p css={commentStyle}>{comment}</p>
    <div css={bottomStyle}>
      <div>IMAGE(PROGRESS Status)</div>
      <div>
        {place}
        <div>{date} {time}</div>
      </div>
    </div>
  </div>
}

const wrapper = css`
  height: 20rem;
  background: #fff;
  width: calc(33.3333% - 3rem);
  min-width: 20rem;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  border-radius: 0.4rem;
  box-shadow: rgb(0 0 0 / 4%) 0 4px 16px 0;
  overflow: hidden;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;

  &:hover {
    transform: translate(5px, -10px);
    background: lightgrey;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.3;
  }
`
const commentStyle = css`
  height: 100%;
  margin-top: 1rem;
  font-size: 1.4rem;
  line-height: 1.2;
  word-break: break-all
`
const bottomStyle = css`
  box-shadow: inset 0 calc(1 * 1px) 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  text-align: center;
`
const headerStyle = css`
  display: flex;
  flex-direction: column;

  .from, .to {
    color: ${palette.grey[500]};
    margin-left: 0.5rem;
    align-self: flex-end;
  }

  span {
    color: ${palette.blueGrey[600]};
    font-weight: bold;
  }
`

export default ScheduleCard
