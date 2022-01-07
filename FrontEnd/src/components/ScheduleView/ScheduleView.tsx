import { css } from '@emotion/react'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { useState } from 'react'
import { ScheduleValue, useScheduleView } from '../../hooks/useScheduleView'
import ViewBase from '../ViewBase'

type ScheduleViewProps = {
  type?: string
}

function ScheduleView({ type }: ScheduleViewProps) {
  const {list, error, loading}  = useScheduleView();
  const [dataSource, setDataSourece] = useState<ScheduleValue[] | undefined>();
  const loadData = async()=> {
     const data: ScheduleValue[] | undefined = await list('ryan4321@naver.com')
     setDataSourece(data)
  }

  console.log(type)
  return (
    <ViewBase title="MY SCHEDULE">
      <div css={tableStyle}>
        <Table
          pagination={type === undefined ? false : undefined}
          dataSource={dataSource}
        >
          <Column align="center" title="Date" dataIndex="date" key="date" />
          <Column align="center" title="Event" dataIndex="event" key="event" />         
          <Column align="center" title="Time" dataIndex="time" key="time" />
          <Column align="center" title="Location" dataIndex="location" key="location" />
          <Column align="center" title="Meet Name" dataIndex="meetname" key="meetname" />
          <Column align="center" title="Meet Company" dataIndex="meetcompany" key="meetcompany" />
          <Column align="center" title="Is Confirm" dataIndex="isconfirm" key="isconfirm" />
          <Column align="center" title="Is Meet" dataIndex="ismeet" key="ismeet" />
        </Table>
      </div>
      <button onClick={loadData}></button>
    </ViewBase>
  )
}

const tableStyle = css`
  flex: 1;
  width: 100%;
  white-space: pre;
`

export default ScheduleView
