import { css } from '@emotion/react';
import { createPost } from 'lib/api/post/createPost';
import { usePosts } from 'lib/api/post/usePosts';
import { User } from 'lib/api/types';
import palette from 'lib/palette';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostWrite() {
  const qc = useQueryClient()
  const [body, setBody] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState<any>()
  const quillElement = useRef<any>(null);
  const quillInstance = useRef<any>(null);
  const navigate = useNavigate();
  const posts = usePosts();
  const user = qc.getQueryData<User>('user') as User
  const imgData = [] as any;  

  const createPostMut = useMutation(createPost, {
    onSuccess: () => {
      toast.success('Posting Successful', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      navigate('/')
    },
    onError: () => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
    }
  })

  const onSubmit = useCallback((e) => {
    e.preventDefault()    
    if (!body.trim()) {
      toast.error('Please enter the contents', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000
      })
      return
    }

    createPostMut.mutate({
      contents: body
    })
  }, [body])

  const onChange = (e: any) => {
    setTitle(e.target.value)
  }

  const onPost = () => {        
    // posts.push({
    //   id: String(posts.length + 1),
    //   title: title,
    //   text: body,
    //   created_at: new Date(),
    //   like: 0,
    //   comments: [],
    //   writer: user.username,
    //   images: image
    // })    
    navigate('/')
  }    
  const onCancle = () => {
    navigate(-1);
  }

  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input: any = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); 

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {

      const file = input.files[0];             
      
      imgData.push({        
        img: file,
        imgName: file.name,
        src: `/${file.name}`
      })

      qc.setQueryData('images', imgData);
      const results: any = qc.getQueryData('images');     
      const IMG_URL = `/${results[imgData.length - 1].imgName}`                 
      
      try {       

        const range: { index: Number, length: Number } = quillInstance.current.getSelection();                
        quillInstance.current.insertEmbed(range.index, 'image', IMG_URL);
        setImage(results)        

      } catch (error) {

        //        
      }
    });
  };

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
        theme: 'snow',
        placeholder: '   Please enter the contents...',
        modules: {
          toolbar:{
            container: [
              [ {size: [ 'small', false, 'large', 'huge']}],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered'}, { list: 'bullet'}],
              ['blockquote', 'code-block', 'link', 'image']            
            ],
            handlers: {
              image: imageHandler
            }
          } 
        },
        
    })
    
    const quill = quillInstance.current

    quill.root.innerText = body;
    quill.on('text-change', () => {
        setBody(quill.root.innerText);
    });
    
  },[])

  return (
  <>
    <div css={postWriteStyle}>
      <input css={inputStyle} value="Feel Free To Write" readOnly/>
      <div className={'divider'}>{''}</div>
      <div css={quillWrapperStyle}>
        <div css={editorStyle} ref={quillElement} />
      </div>
    </div>
    <div css={buttonWrapStyle}>
      <button css={buttonStyle} onClick={onSubmit}>Posting</button>
      <button css={buttonStyle} onClick={onCancle}>Cancle</button>
    </div>
  </>
  );
}

export default PostWrite

const editorStyle = css`
  height: 22rem;
  
`
const quillWrapperStyle = css`
  margin: 1rem;
    .ql-editor {
      font-size: 1.125rem;
      line-height: 1.5;
      margin-top: 2rem;        
      margin-left: 1rem;                  
    }
  height: 22rem;
`
const postWriteStyle = css`

  max-width: 54.375rem;
  height: 35rem;
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