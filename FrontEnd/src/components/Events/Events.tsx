import { css } from '@emotion/react'
import ViewBase from '../ViewBase'
import { Paper } from '@mui/material'
import React from 'react'
import palette from '../../lib/palette'

type EventViewProps = {}

export default function Events({}: EventViewProps) {
  return (
    <ViewBase title='EVENT LIST'>
      <div css={wrapper}>
        <Paper css={eventItem}>INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}> INTA 2022</Paper>
        <Paper css={eventItem}>
          <div>INTA 2022</div>
          <span>2022.01.01</span>
          <span>~ 2022.01.31</span>
        </Paper>
      </div>
      <Paper>
        <button>이벤트 생성</button>
      </Paper>
    </ViewBase>
  )
}

const wrapper = css`
  height: 100%;
  flex: 1;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  min-width: 60rem;
`
const eventItem = css`
  width: calc(33.3333% - 1rem);
  margin: 0.5rem;
  padding: 1.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.2;

  &:hover {
    background: ${palette.blue[200]};
    color: #fff;
  }
`
