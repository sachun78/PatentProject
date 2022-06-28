import { Badge, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { StatusBlock, StyledTableCell, StyledTableRow } from 'pages/Meeting/styles'
import { format, isAfter, isBefore } from 'date-fns'
import React from 'react'
import { IMeeting, User } from 'lib/api/types'
import { useNavigate } from 'react-router-dom'
import { API_PATH } from 'lib/api/client'
import { noScheduleStyle } from '../Events/styles'
import { useQueryClient } from 'react-query'

type ScheduleType = 'schedule' | 'history'

export type ScheduleTableProps = {
  meetings: IMeeting[]
  type?: ScheduleType
  isProfile?: boolean
}

function ScheduleTable({ meetings, type = 'schedule', isProfile }: ScheduleTableProps) {
  const navi = useNavigate()
  const qc = useQueryClient()
  const user = qc.getQueryData<User>('user') as User

  if (isProfile) {
    if (meetings.length === 0) {
      return (
        <div css={noScheduleStyle} style={{ height: '16rem' }}>
          <h1>There are no meeting history.</h1>
        </div>
      )
    }
    return (
      <TableContainer
        component={Paper}
        style={{
          borderRadius: '22px',
          maxWidth: '76.25rem',
          position: 'relative',
        }}
        sx={type === 'history' ? { top: 0 } : { top: '-2.875rem' }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="history schedule table" size={'small'}>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '16.75rem' }} align="center">
                Photo
              </StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
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
              if (status === 'replan') {
                if (isBefore(new Date(row.startTime), new Date())) {
                  status = 'expired'
                }
              }
              return (
                <StyledTableRow key={row._id + row.date} hover onClick={() => navi('/meeting/schedule/' + row._id)}>
                  <StyledTableCell align="center">
                    <img
                      src={API_PATH + 'static/' + row.history.photopath}
                      crossOrigin="anonymous"
                      style={{ width: '10.1125rem', height: '6.25rem', objectFit: 'contain' }}
                      alt="meeting_image"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{format(new Date(row.date), 'd MMM, yyyy')}</StyledTableCell>
                  <StyledTableCell align="center">
                    {format(new Date(row.startTime), 'HH:mm - ')} {format(new Date(row.endTime), 'HH:mm')}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.location}</StyledTableCell>
                  <StyledTableCell align="center">
                    {type === 'schedule' ? (
                      <StatusBlock state={status}>{status}</StatusBlock>
                    ) : (
                      <StatusBlock state={row.history.status ? 'met' : ''}>
                        {row.history.status ? 'MET' : 'Failure'}
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
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Company</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
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
                <StyledTableCell align="center">{row.toName ? row.toName : 'No provided'}</StyledTableCell>
                <StyledTableCell align="center">{row.toCompany ? row.toCompany : 'No provided'}</StyledTableCell>
                <StyledTableCell align="center">{row.toEmail}</StyledTableCell>
                <StyledTableCell align="center">{format(new Date(row.date), 'MMM, d')}</StyledTableCell>
                <StyledTableCell align="center">
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
                      {row.history.status ? 'Met' : 'Missed'}
                    </StatusBlock>
                  )}
                  {row.toEmail === user.email && <StatusBlock>receive</StatusBlock>}
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
