import styled from '@emotion/styled'
import { brandColor } from 'lib/palette'
import { resetButton } from 'lib/styles/resetButton'

export const CardSection = styled.section`
  margin-top: 4.375rem;
  display: flex;
  align-items: center;
`

export const CardItem = styled.div`
  width: 285px;
  height: 25rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: none;
    border-radius: 15px;
  }

  & > div {
    width: 15rem;
    height: 10.1875rem;
    padding: 20px;
    background: white;
    position: relative;
    bottom: 100px;
    margin: 0 auto;
    z-index: 2;
    box-shadow: 2px 5px 11px #00000029;
    border-radius: 15px;

    h4 {
      position: relative;
      top: -39px;
      text-align: center;
      text-transform: uppercase;
      font: normal normal 800 16px/36px NanumSquareOTF;
      color: #333333;
    }

    p {
      position: relative;
      top: -40px;
      text-align: center;
      font: normal normal normal 16px/26px NanumSquareOTF;
      color: #6c6c6c;
    }
  }

  & + & {
    margin-left: 1.25rem;
  }
`

export const Section1 = styled.section`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 10.625rem 0 3.125rem;
  margin-top: 8.75rem;
  width: 100%;

  .main-logo {
    position: absolute;
    top: 180px;
    width: 116px;
    height: 150px;
  }

  span {
    font-weight: 800;
  }

  h1 {
    text-align: center;
    color: #333333;
    font: normal normal 300 60px/80px NanumSquareOTF;
    line-height: 1.333333333;
    text-transform: uppercase;
    max-width: 56.25rem;
  }

  p.contents {
    text-align: left;
    color: #6c6c6c;
    font: normal normal normal 18px/28px NanumSquareOTF;
    line-height: 1.75;
    margin-top: 3.125rem;
    max-width: 37rem;
  }
`
export const Footer = styled.footer`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 59.5625rem;
  margin: 7.6875rem auto 0;

  span {
    font: normal normal 800 15px/17px NanumSquareOTF;
    color: #9c9c9c;
  }

  .sungam {
    width: 73px;
    height: 17px;
  }

  .cisun {
    width: 51px;
    height: 17px;
  }
`

export const Header = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 75rem;
  top: 0;
  left: 0;
  right: 0;
  height: 6.25rem;
  margin: 0 auto;
  backdrop-filter: blur(50px);
  z-index: 50;

  img {
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
    ${resetButton};
    overflow: visible;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s linear 0s;
    color: rgb(255, 255, 255);
    background-color: ${brandColor};
    height: 1.75rem;
    width: 9.375rem;
    border-radius: 1rem;
    font: normal normal normal 14px/26px NanumSquareOTF;
    line-height: 1;
  }

  .btn-login {
    color: ${brandColor};
    background-color: transparent;
    border: 1px solid ${brandColor};
  }
`
