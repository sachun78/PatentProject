import { useRef, useEffect, useState} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css'
import { css } from '@emotion/react'
import palette from 'lib/palette';
import React from 'react';

function PostWrite() {
    const [body, setBody] = useState("")
    const quillElement = useRef<any>(null);
    const quillInstance = useRef<any>(null);

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
            }
        })
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
        <button css={buttonStyle}>포스트 등록</button>
        <button css={buttonStyle}>취소</button>
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
    margin-top: 1.25rem;
    margin-bottom: 1.875rem;
    border: 1px solid #9C9C9C;
  }
`

const inputStyle = css`
    width: 100%;
    border: none;
    outline: none;
    padding-bottom: 0.5rem;
    margin-top: 2rem;
    padding: 0 2rem;
    font-size: 2.5rem;
    
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