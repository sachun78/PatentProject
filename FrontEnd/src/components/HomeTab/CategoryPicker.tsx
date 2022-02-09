import { css } from '@emotion/react'
import palette from '../../lib/palette'
import React, { useState } from 'react'

export type CategoryPickerProps = {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

const selectItem = [[0, '12'], [1, '23'], [2, '56'], [3, '78']]

function CategoryPicker({ visible, onClose }: CategoryPickerProps) {

  const [select, setSelect] = useState(0)
  return <>
    {visible ? <div css={wrapper}>
      <div css={blockStyle} onClick={onClose}>
        <ul>
          {selectItem.map(([value, text]) => (
            <li
              key={value}
              onClick={() => setSelect(value as number)}
              className={value === select ? 'active' : ''}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div> : null}
  </>
}

const wrapper = css`
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 5;
`
const blockStyle = css`
  margin-top: 0.8rem;
  width: 19.2rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: ${palette.grey[50]};
  color: ${palette.blueGrey[600]};
  transform-origin: top right;

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  li {
    cursor: pointer;

    &:hover {
      background: ${palette.grey[100]};
    }

    font-weight: 600;
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;

    &.active {
      color: ${palette.blueGrey[900]};
    }
  }

  li + li {
    border-top: 1px solid ${palette.grey[100]};
  }

  .contact {
    border-top: 1px solid #f1f3f5;
    padding: 1rem;

    h5 {
      margin: 0;
      font-size: 0.75rem;
    }

    .email {
      color: ${palette.blueGrey[600]};
      font-size: 0.75rem;
    }
  }
`

export default CategoryPicker
