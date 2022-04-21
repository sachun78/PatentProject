import { containerStyle, imgBxStyle, contentStyle, wrapStyle } from 'pages/Conference/styles'
import React from 'react'
import Card from './Card';

type ConferenceProps = {}

function Conference({}: ConferenceProps) {
  return (<>
      <div css={wrapStyle}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default Conference