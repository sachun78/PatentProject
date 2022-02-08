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
  line-height: 2.2;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  margin: 0.2rem;

  label {
    padding: 0 0 4px;
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  svg {
    margin-bottom: 0.1rem;
    cursor: pointer;
    padding: 0.4rem;
    width: 1.2rem;
    height: 1.2rem;
  }
`

export default Tag
