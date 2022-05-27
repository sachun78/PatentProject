import styled from '@emotion/styled'
import { brandColor } from 'lib/palette'
import { resetButton } from 'lib/styles/resetButton'

export const CardSection = styled.section`
  margin-top: 4.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CardItem = styled.div`
  width: 24.5rem;
  height: 3.125rem;
  background: #ffffff;
  border: 1px solid #707070;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  & + & {
    margin-top: 1.875rem;
  }
`

export const Section1 = styled.section`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10.625rem 0 3.125rem;
  margin-top: 8.75rem;
  width: 100%;

  .main-logo {
    position: absolute;
    top: -58px;
    width: 116px;
    height: 150px;
  }

  span {
    font-weight: 800;
  }

  h1 {
    text-align: center;
    color: #333333;
    font: normal normal 300 51px/60px NanumSquareOTF;
    line-height: 1.176470588;
    width: 990px;
  }

  h2 {
    text-align: center;
    color: #333333;
    font: normal normal 300 36px/60px NanumSquareOTF;
    line-height: 1.666666667;
    max-width: 66rem;
    width: 990px;
  }
`
export const Footer = styled.footer`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 59.5625rem;
  margin: 5rem auto 0;

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

export const MainSection = styled.section`
  margin: 3.125rem auto 0;
  min-width: 1220px;
  position: relative;

  img {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .large-block {
    position: relative;
    width: 1.875rem;
    height: 45rem;
    background: #910457;
  }

  .small-block {
    position: absolute;
    width: 1.875rem;
    height: 31rem;
    top: 113px;
    left: 1191px;
    background: #910457;
  }

  .text-block {
    position: absolute;
    top: 123px;
    left: 50.625rem;
    width: 25rem;
    height: 29.75rem;
    background: #fff;
    z-index: 5;
    padding: 1.875rem;
  }

  p.contents {
    width: 21.25rem;
    height: 416px;
    position: relative;
    text-align: left;
    color: #6c6c6c;
    font: normal normal normal 18px NanumSquareOTF;
    line-height: 1.55;
    max-width: 37rem;
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
