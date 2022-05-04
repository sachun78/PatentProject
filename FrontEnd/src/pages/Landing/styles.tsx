import styled from '@emotion/styled'
import { brandColor } from '../../lib/palette'

export const Section1 = styled.section`
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  padding: 80px 40px;
  width: 100%;

  align-items: center;
  flex-direction: column;

  span {
    color: ${brandColor};
  }

  p {
    letter-spacing: -0.01em;
    text-align: left;
    color: rgb(102, 102, 102);
    font-size: 1rem;
    line-height: 1;
    font-weight: 900;
    text-transform: uppercase;
  }

  h1 {
    font-size: 4.20875rem;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.01em;
    text-align: center;
    color: rgb(0, 0, 0);
    margin-top: 48px;
  }

  p.contents {
    letter-spacing: -0.01em;
    text-align: center;
    color: rgb(0, 0, 0);
    font-size: 1.125rem;
    line-height: 2;
    font-weight: 500;
    margin-top: 48px;
    max-width: 700px;
  }
`
export const Header = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 104px;
  padding-left: 40px;
  padding-right: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 4px;
  img {
    width: 5rem;
    height: 5rem;
  }
  ul {
    display: flex;
    align-items: center;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    transition: all 0.2s linear 0s;
    position: relative;
  }

  li:not(.skip) {
    margin: 0 20px;

    a {
      font-size: 1rem;
      line-height: 1;
      color: black;
      font-weight: 700;
      transition: all 0.2s linear 0s;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid rgb(255, 255, 255);
      text-decoration: none;
    }
  }

  button {
    overflow: visible;
    appearance: none;

    position: relative;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    text-align: center;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s linear 0s;
    color: rgb(255, 255, 255);
    background-color: ${brandColor};
    opacity: 1;
    height: 48px;
    padding-left: 24px;
    padding-right: 24px;
    border-radius: 40px;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1;
  }
`
