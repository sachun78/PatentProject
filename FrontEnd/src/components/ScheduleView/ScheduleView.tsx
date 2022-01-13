import { css } from '@emotion/react'
import { Button, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { useEffect, useState } from 'react'
import { ScheduleValue, useScheduleView } from '../../hooks/useScheduleView'
import ViewBase from '../ViewBase'
import React from 'react'
import { NavLink } from 'react-router-dom'

type ScheduleViewProps = {
  type?: string
}

function ScheduleView({ type }: ScheduleViewProps) {
  const { list, error, loading } = useScheduleView()
  const [dataSource, setDataSourece] = useState<ScheduleValue[] | undefined>()

  useEffect(() => {
    const loadData = async () => {
      const data: ScheduleValue[] | undefined = await list('ryan4321@naver.com')
      setDataSourece(data)
    }
    loadData()
  }, [])

  console.log(type)
  return (
    <ViewBase title="MY SCHEDULE">
      <div css={tableStyle}>
        <Table
          pagination={type === undefined ? false : undefined}
          dataSource={dataSource}
        >
          {type === undefined ? (
            <>
              <Column align="center" title="Date" dataIndex="date" key="date" />
              <Column align="center" title="Time" dataIndex="time" key="time" />
              <Column
                align="center"
                title="Location"
                dataIndex="location"
                key="location"
              />
              <Column
                align="center"
                title="Meet Name"
                dataIndex="meetname"
                key="meetname"
              />
            </>
          ) : (
            <>
              <Column align="center" title="Date" dataIndex="date" key="date" />
              <Column
                align="center"
                title="Event"
                dataIndex="event"
                key="event"
              />
              <Column align="center" title="Time" dataIndex="time" key="time" />
              <Column
                align="center"
                title="Location"
                dataIndex="location"
                key="location"
              />
              <Column
                align="center"
                title="Meet Name"
                dataIndex="meetname"
                key="meetname"
              />
              <Column
                align="center"
                title="Meet Company"
                dataIndex="meetcompany"
                key="meetcompany"
              />
              <Column
                align="center"
                title="Is Confirm"
                dataIndex="isconfirm"
                key="isconfirm"
              />
              <Column
                align="center"
                title="Is Meet"
                dataIndex="ismeet"
                key="ismeet"
              />
            </>
          )}
        </Table>
        {type && (
          <div css={right}>
            <Button>
              <NavLink to={'/meeting/request'}>미팅요청</NavLink>
            </Button>
          </div>
        )}
      </div>
    </ViewBase>
  )
}

const tableStyle = css`
  flex: 1;
  width: 100%;
  white-space: pre-line;
`

const right = css`
  display: flex;
  justify-content: right;
  margin-top: 2rem;
  .ant-btn {
    min-width: 10rem;
    border-radius: 0.25rem;
  }
`

export default ScheduleView
