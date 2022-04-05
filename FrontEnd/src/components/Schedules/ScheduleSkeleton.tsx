import { Skeleton } from '@mui/material'
import { bottomStyle, commentStyle, headerStyle, wrapper } from './ScheduleCard'

export type ScheduleSkeletonProps = {}

function ScheduleSkeleton({}: ScheduleSkeletonProps) {
  return <div css={wrapper('')}>
    <div css={headerStyle}>
      <h3><Skeleton variant='rectangular' /></h3>
      <p className='from'><span> <Skeleton variant='text' width={160} /></span></p>
      <p className='to'><span> <Skeleton variant='text' width={160} /></span></p>
    </div>
    <p css={commentStyle}><Skeleton variant='rectangular' height={100} /></p>
    <div css={bottomStyle}>
      <Skeleton variant='text'>
        <div>testtest</div>
      </Skeleton>
      <Skeleton variant='text'>
        <div>test test test</div>
      </Skeleton>
    </div>
  </div>
}

export default ScheduleSkeleton
