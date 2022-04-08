import { css } from '@emotion/react'

export const bodyStyle = css`
  height: 4.5625rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-wrap: wrap;

  span {
    margin-right: 9.875rem;
    margin-left: 13.75rem;
    font: normal normal 800 15px/17px 'NanumSquare';
    color: #333;
  }

  .sponsors {
    flex: 1;

    img {
      width: 4.5725rem;
      height: 4rem;
      margin-right: 3.615rem;
    }
  }
`
