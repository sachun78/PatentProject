import { Badge, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { StatusBlock, StyledTableCell, StyledTableRow } from 'pages/Meeting/styles'
import { format, isAfter, isBefore } from 'date-fns'
import React from 'react'
import { IMeeting } from 'lib/api/types'
import { useNavigate } from 'react-router-dom'

export type ScheduleTableProps = {
  meetings: IMeeting[]
}

function ScheduleTable({ meetings }: ScheduleTableProps) {
  const navi = useNavigate()

  return (
    <TableContainer component={Paper} style={{ borderRadius: '1rem', maxWidth: '80.3125rem', marginBottom: '1rem' }}>
      <Table sx={{ minWidth: 700 }} aria-label="history schedule table" size={'small'}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Company</StyledTableCell>
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
              if (isBefore(new Date(row.startTime), new Date())) {
                status = 'expired'
              } else {
                status = 'pending'
              }
            }
            return (
              <StyledTableRow key={row._id + row.date} hover onClick={() => navi('/meeting/schedule/' + row._id)}>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">{row.ownerName}</StyledTableCell>
                <StyledTableCell align="center">{row.company}</StyledTableCell>
                <StyledTableCell align="center">{row.toEmail}</StyledTableCell>
                <StyledTableCell align="center">
                  {format(new Date(row.date), 'EEEE, d MMM, yyyy')} <br />
                  {format(new Date(row.startTime), 'HH:mm - ')} {format(new Date(row.endTime), 'HH:mm')}
                </StyledTableCell>
                <StyledTableCell align="left">{row.location}</StyledTableCell>
                <StyledTableCell align="center">
                  <Badge
                    color="error"
                    variant="standard"
                    badgeContent={'end'}
                    invisible={
                      status === 'cancel' ||
                      status === 'expired' ||
                      status === 'pending' ||
                      isAfter(new Date(row.startTime), new Date())
                    }
                  >
                    <StatusBlock state={status}>{status}</StatusBlock>
                  </Badge>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ScheduleTable
