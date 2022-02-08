import { css } from '@emotion/react'
import IconControl from '../IconControl'

export type SceduleCardPlusProps = {}

function ScheduleCardPlus({}: SceduleCardPlusProps) {
  return <div css={wrapper}><IconControl name='plus' /></div>
}

const wrapper = css`
  height: 20rem;
  background: #fff;
  width: calc(33.3333% - 3rem);
  min-width: 20rem;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  box-shadow: rgb(0 0 0 / 4%) 0 4px 16px 0;
  overflow: hidden;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
`

export default ScheduleCardPlus
