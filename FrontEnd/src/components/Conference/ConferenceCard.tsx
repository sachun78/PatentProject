import { css } from '@emotion/react';
import * as React from 'react';
import Paper from '@mui/material/Paper';


type conferenceCardProps = {
  img: string
}

function ConferenceCard({ img }: conferenceCardProps) {
  return (
    <Paper elevation={3} css={cardStyle}>    
      <div className='imgBx'>
        <img src={img}
          style={{ 
            width: "100%",              
            borderRadius: "1rem",
            height: "100%",            
        }}/>        
      </div>
      <div css={titleStyle}>
      <h3>Conference Title</h3>
      </div>        
      <div className='content' css={contentStyle}>                
        <p>
        May 16 ~ 20, 2023
        Singapore <br />
        Sample text Sample text Sample text Sample text Sample text
        </p>
      </div>    
    </Paper>
  );
}

export default ConferenceCard

const titleStyle=css`
  position: relative;
  margin-top: -3rem;
  color: #333333;  
`

const cardStyle = css`
  position: relative;
  max-width: 18rem;
  height: 270px;
  background: #fff;
  margin: 40px 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: 0.3s ease-in-out;
  text-align: center;
  border-radius: 1rem;  

  &:hover {
    height: 340px;

    .content {
      visibility: visible;
      opacity: 1;
      /* margin-top: -40px */
      transition-delay: 0.3s;
    }
  }
  
  .imgBx {
    position: relative;
    width: 16rem;
    min-height: 260px;
    height: 260px;
    top: -60px;
    margin: 0 auto;
    border-radius: 1rem;       
  }
`

const contentStyle = css`
  position: relative;  
  padding: 10px 15px;
  text-align: center;
  color: #6c6c6c;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out; 
  overflow-y: auto 
`