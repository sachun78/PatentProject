import styled from '@emotion/styled'
import { css } from '@emotion/react'
import palette, { brandColor } from 'lib/palette'

export const Container = styled.div`
  max-width: 90rem;
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
  box-shadow: inset 0 calc(-1 * 1px) 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;

  img {
    margin-right: 2rem;
    border-radius: 999px;
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
  }

  button {
    margin-left: 1rem;
  }
`

export const UserBody = styled.div`
  display: flex;
  padding: 2rem 0;
  margin-left: 2rem;
  margin-right: 2rem;

  h3 {
    margin: 0 0 1rem;
  }
`

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 1rem;

  svg {
    margin-right: 1rem;
    font-size: 1.5rem;
    color: ${brandColor};
  }

  span {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    color: #5e5c7f;
  }
`

export const Middle = styled.div`
  flex: 1;
  padding-right: 1rem;

  pre {
    white-space: pre-wrap;
    font-size: 0.75rem;
    font-family: NanumSquareOTF;
    line-height: 1.5;
    margin: 0 0 1rem;
    color: ${palette.blueGrey[600]};
  }
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
  // background: ${palette.lightBlue[50]};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.4rem;
  font-size: 0.875rem;
  ${FieldStyle}
`

export const NameMailContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.125rem;
    color: #999;
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
