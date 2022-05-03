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
  border-radius: 1rem;
  padding: 30px;

  h1 {
    color: #333;
    margin: 0 0 1.25rem;
    font: normal normal 800 20px/23px NanumSquareOTF;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const MeetingSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.875rem;
  color: #333333;
  width: 100%;

  .multiline {
    white-space: pre-wrap;
    max-width: 100%;
    overflow-wrap: break-word;
  }

  h2 {
    font: normal normal 800 16px/18px NanumSquareOTF;
    margin: 0 0 0.25rem;
    border-radius: 0.5rem;
  }

  p {
    margin: 0;
    font: normal normal normal 16px/18px NanumSquareOTF;
    padding: 1rem 0;
    border-radius: 0.5rem;

    &:hover {
      font-weight: bold;
    }
  }

  p + p {
    margin-top: 0.625rem;
  }
`
const statusColor = ({ state }: { state: string }) => css`
  background: ${state === 'replan' && brandColor};
  background: ${state === 'confirm' && palette.green[400]};
`

export const StatusBlock = styled.div`
  padding: 0.5rem 0.75rem;
  background: #ddd;
  color: white;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 0.5rem;
  display: inline-block;
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.1);
  ${statusColor}
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
