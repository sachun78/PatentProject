import { css } from '@emotion/react'
import ViewBase from '../ViewBase'

type EventViewProps = {}

export default function EventView({}: EventViewProps) {
  return (
    <ViewBase title="MY EVENT">
      <div css={wrapper}>Event View</div>
    </ViewBase>
  )
}

const wrapper = css`
  hegiht: 100%;
  flex:1;
  text-align: center;
`
