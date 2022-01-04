import { css } from '@emotion/react'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import ViewBase from '../ViewBase'

type ScheduleViewProps = {
  type?: string
}

function ScheduleView({ type }: ScheduleViewProps) {
  const dataSource = [
    {
      key: '1',
      people: 'Mike',
      date: '2022.05.11',
      time: 32,
      place: '10 Downing Street',
    },
    {
      key: '2',
      people: 'Mike',
      date: '2022.05.11',
      time: 32,
      place: '10 Downing Street',
    },
    {
      key: '3',
      people: 'Mike',
      date: '2022.05.11',
      time: 32,
      place: '10 Downing Street',
    },
    {
      key: '4',
      people: 'Mike',
      date: '2022.05.11',
      time: 32,
      place: '10 Downing Street',
    },
  ]
  console.log(type)
  return (
    <ViewBase title="MY SCHEDULE">
      <div css={tableStyle}>
        <Table
          pagination={type === undefined ? false : undefined}
          dataSource={dataSource}
        >
          <Column align="center" title="날짜" dataIndex="date" key="date" />
          <Column align="center" title="시간" dataIndex="time" key="time" />
          <Column align="center" title="장소" dataIndex="place" key="place" />
          <Column
            align="center"
            title="만날사람"
            dataIndex="people"
            key="people"
          />
        </Table>
      </div>
    </ViewBase>
  )
}

const tableStyle = css`
  flex: 1;
  width: 100%;
`

export default ScheduleView
