import styled from '@emotion/styled'

export const Container = styled.div`
  max-width: 90rem;
  background: rgba(255, 255, 255, 0.8);
  height: 100%;
  border-radius: 1rem;
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
  }

  button {
    margin-left: 1rem;
  }
`

export const UserBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  margin-left: 2rem;
  margin-right: 2rem;
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
