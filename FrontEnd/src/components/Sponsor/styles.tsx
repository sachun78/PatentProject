import { css } from '@emotion/react'

export const bodyStyle = css`
  height: 4.5625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-wrap: nowrap;
  position: relative;
  width: 100%;

  span {
    margin-right: 9.875rem;
    margin-left: 13.75rem;
    font: normal normal 800 15px/17px 'NanumSquare';
    color: #333;
  }

  .sponsors {
    width: 50%;
    display: flex;
    position: relative;
    justify-content: space-between;

    img {
      width: 4.5725rem;
      height: 4rem;
    }
  }

  .space {
    flex: 1;
  }
`
