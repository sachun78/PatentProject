import { css } from '@emotion/react';
import * as React from 'react';
import ConferenceCard from './ConferenceCard';


type conferenceProps = {}

function Conference({}: conferenceProps) {
  
  const img1 = 'tempConference.jpg'
  const img2 = 'testCon.jpg'

  return (
      <div className='container' css={containerStyle}>
        <ConferenceCard img={img1} />
        <ConferenceCard img={img2} />      
        <ConferenceCard img={img1} />
        <ConferenceCard img={img2} />
        <ConferenceCard img={img1} />
        <ConferenceCard img={img2} />
        <ConferenceCard img={img1} />
        <ConferenceCard img={img2} />
              
      </div>    
  );
}

export default Conference

const containerStyle = css`
  position: relative;
  width: 60.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* padding: 30px;  */
`