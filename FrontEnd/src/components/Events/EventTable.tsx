import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { StyledTableCell, StyledTableRow } from 'pages/Meeting/styles'
import { format, isBefore } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IEvent } from 'lib/api/types'

export type EventTableProps = {
  events: IEvent[]
}

function EventTable({ events }: EventTableProps) {
  const navi = useNavigate()
  return (
    <TableContainer component={Paper} style={{ borderRadius: '1rem', maxWidth: '80.3125rem', marginBottom: '1rem' }}>
      <Table sx={{ minWidth: 700 }} aria-label="history schedule table" size={'small'}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Period</StyledTableCell>
            <StyledTableCell align="center">Schedule</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...events].reverse().map((row) => {
            const disabled = isBefore(new Date(row.end_date), new Date())
            return (
              <StyledTableRow
                key={row._id}
                hover={!disabled}
                onClick={() => navi('/meeting/event/' + row._id)}
                sx={disabled ? { backgroundColor: '#d3d3d3' } : undefined}
              >
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">
                  {format(new Date(row.start_date), 'EEEE, d MMM, yyyy - ')}
                  {format(new Date(row.end_date), 'EEEE, d MMM, yyyy')}
                </StyledTableCell>
                <StyledTableCell align="center">{row.meeting_list.length}</StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventTable
