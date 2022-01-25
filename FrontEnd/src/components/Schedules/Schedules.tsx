import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { ScheduleValue, useScheduleView } from '../../hooks/useScheduleView'
import ViewBase from '../ViewBase'
import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

type ScheduleViewProps = {
  type?: string
}

function Schedules({ type }: ScheduleViewProps) {
  const { list, error, loading } = useScheduleView()
  const [dataSource, setDataSourece] = useState<ScheduleValue[] | undefined>()

  useEffect(() => {
    const loadData = async () => {
      const data: ScheduleValue[] | undefined = await list('ryan4321@naver.com')
      setDataSourece(data)
    }
    loadData()
  }, [])


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
    <ViewBase title='MY SCHEDULE'>
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
    </ViewBase>
  )
}

const tableStyle = css`
  flex: 1;
  width: 100%;
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

export default Schedules
