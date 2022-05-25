import { css } from '@emotion/react';
import { Fab } from '@mui/material';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ConferenceCard from './ConferenceCard';
import AddIcon from '@mui/icons-material/Add';

type conferenceProps = {}

function ConferenceList({}: conferenceProps) {
  
  const img1 = '/assets/conference_sample.png'
  const img2 = '/assets/conference_sample2.jpg'

  return (
    <>
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
      <NavLink to={'write'}>
      {/* <Link css={linkStyle} > */}
        <Fab sx={{ position: 'fixed', bottom: 103, right: '2rem', zIndex: 10 }} color="primary" >
          <AddIcon />
        </Fab>
      {/* </Link> */}
      </NavLink>
    </>    
  );
}

export default ConferenceList

const containerStyle = css`
  position: relative;
  width: 60.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* padding: 30px;  */
`

const linkStyle = css`
  text-decoration: none;

  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    cursor: pointer;
  }
`