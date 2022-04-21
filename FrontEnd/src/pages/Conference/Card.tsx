import { containerStyle, imgBxStyle, contentStyle, wrapStyle } from 'pages/Conference/styles'
import React from 'react'

type cardProps = {}

function Card({}: cardProps) {
  return (
  <div css={containerStyle} className='container'>
    <div className='card'>
      <div css={imgBxStyle} className='imgBx'>
        <img src='/temp.jpg' />          
        <h2>컨퍼런스 제목</h2>
      </div>
      <div css={contentStyle} className='content'>            
        <p> 콘퍼런스(conference) 또는 컨퍼런스는 화제에 관해 협의하는 사람들의 모임 또는 회의이다.컨벤션 학술 회의(학회, Academic conference) : 과학이나 학계에서 연구자들이 연구 활동과 성과, 공동 연구, 연구 결과 등을 발표하는 공식적인 회의
            사업 회의(Business conference) : 사업이나 기업 관련 문제에 대한 토론과 회의
            애슬레틱 콘퍼런스(Athletic conference) : 지리적으로 연관되어 있는 스포츠 팀들의 모임
            콘퍼런스 콜(전화 회의) : 여러 명이 전화를 통하여 의논하는 일 또는 그런 모임
            콘퍼런스 홀 : 회의가 열리는 장소
            풋볼 콘퍼런스 : 잉글랜드 축구 리그
        </p> 
      </div>
    </div>
  </div>
  )  
}

export default Card