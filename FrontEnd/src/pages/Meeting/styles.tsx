import styled from '@emotion/styled'
import { TableCell, tableCellClasses, TableRow, ToggleButton } from '@mui/material'
import palette, { brandColor } from 'lib/palette'
import { css } from '@emotion/react'
import { resetButton } from 'lib/styles/resetButton'
import { Link } from 'react-router-dom'

export const ContainerBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 29.0625rem;
  min-width: 465px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 5px 11px #00000029;
  border-radius: 1rem;
  padding: 30px;

  h1 {
    color: #333;
    margin: 0 0 1.875rem;
    font: normal normal 800 20px/23px NanumSquareOTF;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const MeetingSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.3125rem;
  color: #333333;
  width: 100%;

  .multiline {
    white-space: pre-wrap;
    max-width: 100%;
    overflow-wrap: break-word;
    color: #6c6c6c;
    font: normal normal normal 16px/26px NanumSquareOTF;
  }

  .email {
    font: normal normal normal 16px/18px NanumSquareOTF;
    color: #9c9c9c;
  }

  .state-text {
    font: normal normal normal 16px/26px NanumSquareOTF;
    color: #6c6c6c;
    margin-left: 1.25rem;
  }

  h2 {
    font: normal normal 800 16px/36px NanumSquareOTF;
    line-height: 2.25;
    margin: 0 0 0.25rem;
    border-radius: 0.5rem;
  }

  p {
    margin: 0;
    font: normal normal normal 16px/18px NanumSquareOTF;
  }

  .divider {
    background: #d9d9d9 0% 0% no-repeat padding-box;
    height: 18px;
    width: 1px;
  }
`
const statusColor = ({ state }: { state: string }) => css`
  background: ${state === 'met' && brandColor};
  color: ${state === 'met' && '#fff'};
  // background: ${state === 'confirm' && palette.green[400]};
  background: ${state === 'Expired' && '#ddd'};
`

export const StatusBlock = styled.div`
  width: 4rem;
  height: 1.125rem;
  color: #6c6c6c;
  font: normal normal normal 12px/18px NanumSquareOTF;
  border: 1px solid #9c9c9c;
  border-radius: 50px;
  background: #fff;
  display: inline-block;
  text-align: center;
  ${statusColor};
`

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#910457 ',
    color: '#fff',
    font: 'normal normal 800 16px/18px NanumSquareOTF',
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#6C6C6C',
    font: 'normal normal normal 16px/26px NanumSquareOTF',
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer',
}))

export const ScheduleInfoBlock = styled.div`
  display: flex;
  align-items: center;

  & {
    color: #6c6c6c;
    font: normal normal normal 16px/26px NanumSquareOTF;
  }

  & + & {
    margin-top: 4px;
  }

  svg {
    margin-right: 6px;
  }
`

export const UploadButton = styled.button`
  ${resetButton};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12.5rem;
  min-height: 12.5rem;
  background-color: #f2f2f2;
`

export const InfoLink = styled(Link)`
  border: 1px solid #9c9c9c;
  text-decoration: none;
  border-radius: 0.75rem;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  font: normal normal normal 12px/18px NanumSquareOTF;
  color: #6c6c6c;
`

export const RescheduleButton = styled(ToggleButton)`
  border: 1px solid #9c9c9c;
  border-radius: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 1.125rem;

  font: normal normal normal 12px/18px NanumSquareOTF;
  color: #6c6c6c;
  text-transform: none;
  margin-left: 10px;
`
