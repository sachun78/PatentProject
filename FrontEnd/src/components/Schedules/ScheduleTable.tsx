import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { StyledTableCell, StyledTableRow } from 'pages/Meeting/styles'
import { format, formatDistanceToNow } from 'date-fns'
import React from 'react'
import { IMeeting } from 'lib/api/types'
import { useNavigate } from 'react-router-dom'

export type ScheduleTableProps = {
  meetings: IMeeting[]
}

function ScheduleTable({ meetings }: ScheduleTableProps) {
  const navi = useNavigate()

  return (
    <TableContainer component={Paper} style={{ borderRadius: '1rem', maxWidth: '60rem', marginBottom: '1rem' }}>
      <Table sx={{ minWidth: 700 }} aria-label="history schedule table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((row) => {
            let status = row.status
            if (status === 'none') {
              const dist = formatDistanceToNow(new Date(row.startTime), {
                addSuffix: true,
              })
              if (dist.includes('ago')) {
                status = 'expired'
              }
            }
            return (
              <StyledTableRow key={row.title + row._id} hover onClick={() => navi('/meeting/schedule/' + row._id)}>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">{row.toEmail}</StyledTableCell>
                <StyledTableCell align="center">
                  {format(new Date(row.date), 'yyyy.MM.dd ')} <br />
                  {format(new Date(row.startTime), 'HH:mm ~ ')}
                  {format(new Date(row.endTime), 'HH:mm')}
                </StyledTableCell>
                <StyledTableCell align="left">{row.location}</StyledTableCell>
                <StyledTableCell align="center">{status}</StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ScheduleTable
