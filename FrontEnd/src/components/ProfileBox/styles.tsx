import styled from '@emotion/styled'

export const FlexRow = styled.div`
  display: flex;
  align-items: center;

  .header p:nth-of-type(1) {
    font: normal normal 800 18px/21px NanumSquareOTF;
    margin-bottom: 0.25rem;
  }

  .header p:nth-of-type(2) {
    font: normal normal normal 1rem/26px NanumSquareOTF;
    color: #6c6c6c;
    display: flex;

    span {
      display: flex;
      align-items: center;

      svg {
        margin-right: 6px;
      }
    }

    span + span {
      margin-left: 1.5625rem;
    }
  }
`
