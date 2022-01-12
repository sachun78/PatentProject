import { css } from '@emotion/react'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { useEffect, useState } from 'react'
import { MyNetworkValue, useMyNetwork, useMyNetworkup } from '../../hooks/useMyNetwork'
import { MyNetworkResult } from '../../lib/api/MyNetwork/getlist'
import ViewBase from '../ViewBase'

type MyNetworkProps = {}

function MyNetwork({}: MyNetworkProps) {
  const {list, error, loading}  = useMyNetwork();
  const [dataSource, setDataSourece] = useState<MyNetworkValue[] | undefined>();

  useEffect(()=> {
    const loadData = async()=> {
      const data: MyNetworkValue[] | undefined = await list('ryan4321@naver.com')
      //const data: MyNetworkValue[] | undefined = await list('test@test.com')
      setDataSourece(data)
   }
    loadData();
  }, [])

  const AddData = async()=> {
    const {upload/*, error, loading*/}  = useMyNetworkup();
    const test:MyNetworkResult = {
      name: "Yang",
      email: "ryan4321@naver.com",
      meetpeople:[
        {
          name: "J",
          email: "test11@test.com",
          company: "J",
          department: "J",
          position: "J",
          tel: "000000000",
          country: "FRA",
          meetcount: 1,
        }
      ]
    }
    const updata = await upload(test)
    
  }

  console.log(dataSource)
  return (
    <ViewBase title="MY Network">
      <div css={tableStyle}>
        <Table
          dataSource={dataSource}
        >
              <Column align="center" title="Country" dataIndex="meet_country" key="meet_country" />
              <Column align="center" title="Name" dataIndex="meet_name" key="meet_name" />         
              <Column align="center" title="Company" dataIndex="meet_company" key="meet_company" />
              <Column align="center" title="Department" dataIndex="meet_department" key="meet_department" />
              <Column align="center" title="Position" dataIndex="meet_position" key="meet_position" />
              <Column align="center" title="Meet Count" dataIndex="meet_count" key="meet_count" />
        </Table>
      </div>
      <div><button onClick={AddData}>추가</button></div>
    </ViewBase>
  )
}

const tableStyle = css`
  flex: 1;
  width: 100%;
  white-space: pre-line;
`

export default MyNetwork
