import styled from '@emotion/styled'
import { TableCell, tableCellClasses, TableRow } from '@mui/material'
import palette, { brandColor } from '../../lib/palette'
import { css } from '@emotion/react'

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
    font-size: 1rem;
    color: #6c6c6c;
    font: normal normal normal 16px/26px NanumSquareOTF;
  }
  .email {
    font: normal normal normal 16px/18px NanumSquareOTF;
    color: #9c9c9c;
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
  //p + p {
  //  margin-top: 0.625rem;
  //}
`
const statusColor = ({ state }: { state: string }) => css`
  background: ${(state === 'replan' || state === 'met') && brandColor};
  background: ${state === 'confirm' && palette.green[400]};
  background: ${state === 'pending' && palette.deepOrange[400]};
`

export const StatusBlock = styled.div`
  padding: 0.2rem 0.75rem;
  background: #ddd;
  color: white;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 0.9rem;
  display: inline-block;
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  ${statusColor};
`

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: brandColor,
    color: '#fff',
    fontWeight: 'bold',
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const ScheduleInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  color: #8b88b1;

  svg {
    margin-right: 1rem;
  }
`
