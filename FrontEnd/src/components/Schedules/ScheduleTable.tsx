import { Badge, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { StatusBlock, StyledTableCell, StyledTableRow } from 'pages/Meeting/styles'
import { format, isAfter, isBefore } from 'date-fns'
import React from 'react'
import { IMeeting } from 'lib/api/types'
import { useNavigate } from 'react-router-dom'

type ScheduleType = 'schedule' | 'history'

export type ScheduleTableProps = {
  meetings: IMeeting[]
  type?: ScheduleType
}

function ScheduleTable({ meetings, type = 'schedule' }: ScheduleTableProps) {
  const navi = useNavigate()

  return (
    <TableContainer
      component={Paper}
      style={{
        borderRadius: '22px',
        maxWidth: '76.25rem',
        position: 'relative',
        boxShadow: 'none',
      }}
      sx={type === 'history' ? { top: 0 } : { top: '-2.875rem' }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="history schedule table" size={'small'}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" size={'medium'}>
              Name
            </StyledTableCell>
            <StyledTableCell align="center" size={'medium'}>
              Company
            </StyledTableCell>
            <StyledTableCell align="center" size={'medium'}>
              E-mail
            </StyledTableCell>
            <StyledTableCell align="center" size={'medium'}>
              Date
            </StyledTableCell>
            <StyledTableCell align="center" size={'medium'}>
              Location
            </StyledTableCell>
            <StyledTableCell align="center" size={'medium'}>
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((row) => {
            let status = row.status
            if (status === 'none') {
              if (isBefore(new Date(row.startTime), new Date())) {
                status = 'Expired'
              } else {
                status = 'Pending'
              }
            }
            if (status === 'replan') {
              if (isBefore(new Date(row.startTime), new Date())) {
                status = 'Expired'
              }
            }
            return (
              <StyledTableRow key={row._id + row.date} hover onClick={() => navi('/meeting/schedule/' + row._id)}>
                <StyledTableCell align="center">{row.toName}</StyledTableCell>
                <StyledTableCell align="center">{row.toCompany}</StyledTableCell>
                <StyledTableCell align="center">{row.toEmail}</StyledTableCell>
                <StyledTableCell align="center">
                  {format(new Date(row.date), 'EE, d MMM, yyyy \n')}
                  {format(new Date(row.startTime), 'HH:mm - ')} {format(new Date(row.endTime), 'HH:mm')}
                </StyledTableCell>
                <StyledTableCell align="center">{row.location}</StyledTableCell>
                <StyledTableCell align="center">
                  {type === 'schedule' ? (
                    <Badge
                      color="error"
                      variant="dot"
                      invisible={status !== 'confirm' || isAfter(new Date(row.startTime), new Date())}
                    >
                      <StatusBlock state={status}>{status}</StatusBlock>
                    </Badge>
                  ) : (
                    <StatusBlock state={row.history.status ? 'met' : ''}>
                      {row.history.status ? 'Met' : 'Failure'}
                    </StatusBlock>
                  )}
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
