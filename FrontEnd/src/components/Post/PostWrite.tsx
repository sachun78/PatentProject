import { useRef, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css'
import { css } from '@emotion/react'
import palette from 'lib/palette'
import React from 'react';
import { usePosts } from 'lib/api/post/usePosts';
import { string } from 'joi';

function PostWrite() {
    const [body, setBody] = useState("")
    const quillElement = useRef<any>(null);
    const quillInstance = useRef<any>(null);
    const navigate = useNavigate();
    const posts = usePosts();



    const onPost = () => {
        posts.push({
            id: String(posts.length + 1),
            title: "아무것",
            text: body,
            created_at: new Date(),
            like: 0,
            comments: [],
            writer: '홍길동'
        })
        navigate('/')
    }    
    const onCancle = () => {
        navigate(-1);
    }

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '   Please enter the contents...',
            modules: {
                toolbar: [
                    [{ header: "1"}, { header: "2"}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered'}, { list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image']
                ]
            },
            
        })
        
        const quill = quillInstance.current

        quill.root.innerText = body;
        quill.on('text-change', () => {
            setBody(quill.root.innerText);
        });

        
    },[])
    return (<>
        <div css={postWriteStyle}>
            <input css={inputStyle} placeholder='Please enter a title' />
            <div className={'divider'}>{''}</div>
            <div css={quillWrapperStyle}>
                <div ref={quillElement} />
            </div>
        </div>
        <div css={buttonWrapStyle}>
            <button css={buttonStyle} onClick={onPost}>Posting</button>
            <button css={buttonStyle} onClick={onCancle}>Cancle</button>
        </div>
    </>
    );
}

export default PostWrite;

const quillWrapperStyle = css`
    .ql-editor {
        font-size: 1.125rem;
        line-height: 1.5;
        margin-top: 2rem;        
        margin-left: 1rem;
        max-height: 35rem;
    }
    
`
const postWriteStyle = css`

  max-width: 54.375rem;
  height: 35rem;;
  margin-bottom: 1.6rem;
  align-items: flex-start;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 1rem;
  opacity: 0.8;
  position: relative;
  background: #fff;

  .divider {
    margin: auto;
    margin-top: 1.25rem;
    margin-bottom: 1.875rem;
    border: 1px solid #9C9C9C;
    width: 95%    
  }
`

const inputStyle = css`
    width: 100%;
    border: none;
    outline: none;
    padding-bottom: 0.5rem;
    margin-top: 2rem;
    padding: 0 2rem;
    font-size: 2rem;
    
`
const buttonWrapStyle = css`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    }
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }
    padding: 0 2rem;
`

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    background: ${palette.cyan[800]};
    &:hover {
        background: ${palette.cyan[600]};
    }
`
