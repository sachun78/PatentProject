import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPost, User } from '../../lib/api/types';

type postDetailProps = {}

function PostDetail({}: postDetailProps) {   

    const location: any = useLocation();    
    const { writer, id, created_at, text} = location.state as any;
    
    return(
        
        <div css={detailStyle}>            
            <div>
                {writer}
            </div>
            <div>
                
            </div>
            <div>
               
            </div>
        </div>        
       
        
    );
}

export default PostDetail

const detailStyle = css`
    
    justify-content: center;
    font-size: 2rem;    
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto;
    
    @media(max-width: 1024px) {
        width: 768px;
    }

    @media(max-width: 768px) {
        width: 100%;
    }
`