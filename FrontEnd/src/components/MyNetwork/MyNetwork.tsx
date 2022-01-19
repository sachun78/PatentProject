import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { MyNetworkValue, useMyNetwork, useMyNetworkFindNUpdate } from '../../hooks/useMyNetwork'
import { MyNetworkResult } from '../../lib/api/MyNetwork/getlist'
import ViewBase from '../ViewBase'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

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
    const {upload/*, error, loading*/}  = useMyNetworkFindNUpdate();
    const test:MyNetworkResult = {
      name: "Yang",
      email: "ryan4321@naver.com",
      meetpeople:[
        {
          name: "J",
          email: "test2@test.com",
          company: "J",
          department: "J",
          position: "J",
          tel: "000000000",
          country: "FRA",
          meetcount: 1,
        }
      ]
    }
  }

  console.log(dataSource)

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein }
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ]

  return (
    <ViewBase title="MY Network">
      <div css={tableStyle}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align='right'>Calories</TableCell>
                <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                <TableCell align='right'>Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.calories}</TableCell>
                  <TableCell align='right'>{row.fat}</TableCell>
                  <TableCell align='right'>{row.carbs}</TableCell>
                  <TableCell align='right'>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
