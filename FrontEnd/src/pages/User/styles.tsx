import styled from '@emotion/styled'
import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'
import { resetButton } from 'lib/styles/resetButton'

export const Container = styled.div`
  width: 54.375rem;
  background: rgba(255, 255, 255, 0.8);
  height: 100%;
  border-radius: 1rem;
  margin-right: 1rem;
`

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid #eee;
  box-shadow: inset 0 calc(-1 * 1px) 0 #9c9c9c;
  margin-bottom: 1.5625rem;
  margin-left: 1.875rem;
  margin-right: 1.875rem;

  img {
    margin-right: 1.25rem;
    border-radius: 999px;
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
  }
`

export const UserBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.875rem 2rem;
  width: 100%;

  h3 {
    margin: 0 0 0.625rem;
    font: normal normal 800 16px/18px NanumSquareOTF;
    color: #6c6c6c;
  }
`

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: #6c6c6c;
  margin-bottom: 1.875rem;

  img {
    margin-right: 0.375rem;
    width: 1.375rem;
    height: 1.375rem;
    color: ${brandColor};
  }

  span {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font: normal normal normal 16px/26px NanumSquareOTF;
  }
`

export const Middle = styled.div`
  width: 100%;
  display: flex;
  padding-right: 1rem;
  // pre {
  //   white-space: pre-wrap;
  //   font-size: 0.75rem;
  //   font-family: NanumSquareOTF;
  //   line-height: 1.5;
  //   margin: 0 0 1rem;
  //   color: ${palette.blueGrey[600]};
  // }
`

export const Field = styled.div`
  flex: 1;
`

const FieldStyle = ({ color }: { color: string }) => css`
  background: ${color};
`

export const FieldItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.875rem;
  ${FieldStyle}
`

export const ButtonBlock = styled.div`
  display: flex;

  button {
    width: 36px;
    height: 36px;
    ${resetButton};
    border: 1px solid #910457;
    border-radius: 999px;
    cursor: pointer;

    img {
      display: inline-block;
      max-width: 100%;
      width: 1.25rem;
      height: 1.25rem;
      object-fit: scale-down;
      border: none;
      margin: 0;
      border-radius: 0;
    }
  }

  button + button {
    margin-left: 0.625rem;
  }
`

export const InnerBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const NameMailContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 5px;
    color: #333;
    font: normal normal 800 18px/21px NanumSquareOTF;
  }

  span {
    font: normal normal normal 15px/17px NanumSquareOTF;
    color: #9c9c9c;
  }
`

export const mailToStyle = css`
  display: flex;
  justify-content: center;
  font-size: 1.75rem;
  margin-left: 1rem;
  color: ${palette.white};
  background-color: ${palette.blue[600]};
  border-radius: 0.4rem;
  padding: 0.35rem 0.5rem;

  &:hover {
    background-color: ${palette.blue[500]};
  }
`
