import { css } from '@emotion/react'
import moment from 'moment'
import { useCallback, useState } from 'react'
import palette from '../../lib/palette'

export type ScheduleCalendarProps = {}

function ScheduleCalendar({}: ScheduleCalendarProps) {
  const [date, setDate] = useState(moment())
  const today = date
  const handleCalTool = (v: boolean) => {
    if (v) setDate(date.clone().add(1, 'month'))
    else setDate(date.clone().subtract(1, 'month'))
  }

  const calendarArr = useCallback(() => {
    const firstWeek = date.clone().startOf('month').week()
    const lastWeek = date.clone().endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week()

    // const endDate

    let result: React.ReactNode[] = []
    let monthData: any[] = []

    const event = {
      title: '2022INTA',
      startDate: moment('2022-02-10'),
      currentDate: moment('2022-02-10'),
      endDate: moment('2022-02-18')
    }

    for (let week = firstWeek; week <= lastWeek; week++) {
      monthData.push(Array(7).fill([]).map((data: any[], index) => {
        const newData = data
        if (event.currentDate.clone().week() === week && event.currentDate.clone().day() === index) {
          // 시작주가 포함됨
          // 현재 차이가 7-index 보다 작은 경우 즉, 현재 주에서 남은 요일보다 더 긴 이벤트라면
          if (event.currentDate.clone().diff(event.endDate, 'days') < -(7 - index)) {
            // 해당 날에 시작하는 이벤트가 포함됨
            event.currentDate = event.currentDate.clone().add(7 - index, 'days')
            return newData.concat({ length: 7 - index })
          } else {
            return newData.concat({ length: Math.abs(event.currentDate.diff(event.endDate, 'days')) + 1 })
          }
        }
        return newData
      }))
    }

    console.log(monthData)

    for (let week = firstWeek; week <= lastWeek; week++) {
      result.push(
        <tr key={week} css={calendarItemStyle}>
          {
            Array(7).fill(0).map((data, index) => {
              let days = date.clone().startOf('year').week(week).startOf('week').add(index, 'day')
              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                // Today
                return (
                  <td key={index} style={{ color: 'red' }} css={selectableDay}>
                    <span>{days.format('D')}</span>
                    <div css={eventStyle}>temp-item</div>
                  </td>
                )
              } else if (days.format('MM') !== today.format('MM')) {
                // 이전 혹은 다음 달
                return (
                  <td key={index} css={disabledDay}>
                    <span>{days.format('D')}</span>
                  </td>
                )
              } else {
                // 일반 날자
                return (
                  <td key={index} css={selectableDay}>
                    <span>{days.format('D')}</span>
                  </td>
                )
              }
            })
          }
        </tr>)
    }
    return result
  }, [date])

  return <div css={calendarStyle}>
    <div className='cal-header'>
      <button onClick={() => {
        handleCalTool(false)
      }}>{'<'}</button>
      {date.clone().format('MMM YYYY')}
      <button onClick={() => {
        handleCalTool(true)
      }}>{'>'}</button>
    </div>
    <table css={calendarBodyStyle} cellSpacing={0}>
      <tbody>
      <tr css={calendarTitleStyle}>
        <td className={'holiday'}>SUN</td>
        <td>MON</td>
        <td>TUE</td>
        <td>WED</td>
        <td>THU</td>
        <td>FRI</td>
        <td className={'holiday'}>SAT</td>
      </tr>
      {calendarArr()}
      </tbody>
    </table>
  </div>
}

const calendarStyle = css`
  height: 64rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1.3rem;
  position: relative;

  .cal-header {
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`
const calendarBodyStyle = css`
  flex-grow: 1;

  td {
    font-weight: 400;
    text-align: center;
  }
`
const calendarItemStyle = css`
  td {
    border: 1px solid ${palette.grey[100]};
    max-height: 11rem;
    min-height: 11rem;
    position: relative;
  }
`

const calendarTitleStyle = css`
  height: 3.2rem;
  font-weight: 600;

  td {
    word-break: break-all;
    width: 10rem;
    border: 2px solid ${palette.grey[100]};
    padding-top: 0.5rem;
  }

  .holiday {
    color: red;
  }
`
const selectableDay = css`
  &:hover {
    background: ${palette.blueGrey[50]};
  }
`
const disabledDay = css`
  background: lightgrey;
  color: grey;
`
const eventStyle = css`
  position: absolute;
  z-index: 3;
  left: 0;
  width: 100%;
  background-color: blue;
  height: 2.5rem;
`

export default ScheduleCalendar
