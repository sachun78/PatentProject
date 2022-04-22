import styled from '@emotion/styled'
import { TableCell, tableCellClasses, TableRow } from '@mui/material'
import { brandColor } from '../../lib/palette'

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
  margin-bottom: 1.875rem;
  color: #333333;

  h2 {
    font: normal normal 800 16px/18px NanumSquareOTF;
    margin: 0 0 1.25rem;
  }

  p {
    margin: 0;
    font: normal normal normal 16px/18px NanumSquareOTF;
  }

  p + p {
    margin-top: 0.625rem;
  }
`

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: brandColor,
    color: '#fff',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 14,
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: 'grey',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
