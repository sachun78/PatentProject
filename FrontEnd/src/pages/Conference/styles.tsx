import { css } from '@emotion/react'

export const wrapStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;  
  max-width: 54.375rem;  
  /* min-height: 40rem; */
  align-items: flex-start;
  /* background: #16384c;   */
  flex-wrap: wrap;
`
export const containerStyle = css`
  position: relative;
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;  
  margin: 1rem;

  .card {
    position: relative;    
    align-items: center;    
    display: flex;
    flex-direction: column;
    height: 15rem;
    /* box-shadow: 0 5px 202px rgba(0, 0, 0, 0.5); */
    /* max-height: 15rem; */
    transition: 0.3s ease-in-out;
    &:hover {
      height: 100%;
      opacity: 0.8;
      
      .content {
        visibility: visible;
        opacity: 1;
        /* margin-top: -1rem; */
        transition-delay: 0.3s;
        width: 25rem;        
      }
    }
  }  
`
export const imgBxStyle = css`
  position: relative;
  text-align: center;
  width: 15rem;
  height: 15rem;    
  background: #fff;  
  /* box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2); */
  z-index: 1;
  border-radius: 1rem;

  img {
    max-width: 100%;
    border-radius: 1rem;
  }
` 
export const contentStyle = css`
  position: relative;
  /* margin-top: -15rem;   */
  text-align: left;
  max-width: 30rem;  
  justify-content: center;
  color: #111;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out;
  background: #fff;  
  font-family: serif, sans-serif;
  line-height: 25px;
  padding: 1rem;  
`  