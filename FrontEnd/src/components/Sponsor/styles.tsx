import { css } from '@emotion/react'

export const bodyStyle = css`
  height: 100%;
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
    margin-top: 2rem;
    align-self: flex-start;
    font: normal normal 800 15px/17px NanumSquareOTF;
    color: #333;
  }

  .sponsors {
    width: 50%;
    display: flex;
    justify-content: space-between;

    img {
      width: 4.5725rem;
      height: 1.075625rem;
      object-fit: scale-down;
    }
  }

  .space {
    flex: 1;
  }
`
