import CloseIcon from '@mui/icons-material/Close'
import { css } from '@emotion/react'

export type TagProps = {
  onDelete?: (e: React.MouseEvent<SVGSVGElement>) => void
  label: string
  visible?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function Tag({ onDelete, label, visible = true, ...rest }: TagProps) {
  return <div {...rest} css={wrapper}>
    <label>{label}</label>
    {visible && <CloseIcon name={label} onClick={onDelete} />}
  </div>
}

const wrapper = css`
  display: inline-flex;
  align-items: center;
  line-height: 1.3;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 6px 0 6px;
  outline: 0;
  margin-bottom: 0.5rem;
  label {
    padding: 0 0 4px;
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
  }
  svg {
    margin-bottom: 0.1rem;
  }
`

export default Tag
