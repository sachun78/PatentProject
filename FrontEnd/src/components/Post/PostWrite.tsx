import { css } from '@emotion/react'
import { createPost } from 'lib/api/post/createPost'
import { postImgUpload } from 'lib/api/post/postImgUpload'
import { User } from 'lib/api/types'
import palette from 'lib/palette'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_PATH } from '../../lib/api/client'

function PostWrite() {
  const qc = useQueryClient()
  const [body, setbody] = useState('')
  const quillElement = useRef<any>(null)
  const quillInstance = useRef<any>(null)
  const navigate = useNavigate()
  const user = qc.getQueryData<User>('user') as User
  const [image, setImage] = useState<string[]>([])  
  
  const BlockEmbed = Quill.import('blots/block/embed');

  // class ImageBlot extends BlockEmbed {
  //   static create(data: any) {
      
  //     const node = super.create(data);
  //     node.setAttribute('data-src', data.src);
  //     node.setAttribute('src', data.src);
  //     node.setAttribute('crossorigin', data.custom);
  //     return node;
  //   }

  //   static value(domNode: any ) {
  //     const { src, crossorigin } = domNode.dataSet;
  //     return { src, crossorigin };
  //   }
  // }

  // ImageBlot.blotName = 'imageBlot';
  // ImageBlot.className = 'image-blot';
  // ImageBlot.tagName = 'img';

  // Quill.register('formats/imageBlot', ImageBlot)
  
  const createPostMut = useMutation(createPost, {
    onSuccess: () => {
      qc.invalidateQueries(['posts'])      
      toast.success('Posting Successful', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
      navigate('/')
    },
    onError: () => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
    },
  })

  const onImageSetting = () => {    
    
    const innerImage = quillInstance.current.getContents().ops.filter((insert: any) => (insert.insert['image'] !== undefined))
    
    innerImage.map((insert: any) => {      
      image.push(insert.insert['image'].slice(29))            
    })      
    
  }

  const onSubmit = useCallback((e) => {
    const imgRegex = /<p><img[^>]*src=[\"']?([^>\"']+)[\"']?[^</p>]*>/gi
    onImageSetting()
    e.preventDefault()
    if (!body.trim()) {
      toast.error('Please enter the contents', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 3000,
      })
      return
    }

    createPostMut.mutate({
      contents: body.replace(imgRegex, ""),
      images: image as string[],
    })
  },[body, image])

  const onCancle = () => {
    navigate(-1)
  }

  const makeUUID = (fileName: string) => {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + fileName.substring(fileName.indexOf("."), fileName.length + 1);
  }

  const imageHandler = () => {    

    const ops = quillInstance.current.getContents().ops    
    const innerImage = ops.filter((insert: any) => (insert.insert['image'] !== undefined))       
    
    if(innerImage.length > 3) {
      toast.success('There are up to four image attachments.', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 2000,
      })
      return;
    }
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input: any = document.createElement('input')
    // 속성 써주기
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
      const file = input.files[0]           
      const formData = new FormData()

      formData.append('post_img', file, makeUUID(file.name))      

      postImgUpload(formData).then((res) => {
        const range = quillInstance.current.getSelection(true);
        quillInstance.current.root.innerHTML = 
          quillInstance.current.root.innerHTML + `<img src='${API_PATH}static/${res.fileName}' crossorigin='anonymous'>` 

        // quillInstance.current.insertEmbed(
        //   range.index,
        //   'imageBlot',
        //   {
        //     src: `${API_PATH}static/${res.fileName}`,
        //     crossorigin: 'anonymous'
        //   }
        // )
        
        // // quillInstance.current.setSelection(range.index + 1)        
      })      
      
    })
  }

  useEffect(() => {
    
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',      
      modules: {
        toolbar: {
          container: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'image'],
          ],
          handlers: {
            image: imageHandler,
          },
        },
      },
    })
    
    const quill = quillInstance.current

    quill.root.innerHTML = body
    quill.on('text-change', () => {
      setbody(quill.root.innerHTML)})
  }, [])

  return (
    <>
      <div css={postWriteStyle}>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <input css={inputStyle} value="Feel Free To Write" readOnly />
          <div className={'divider'}>{''}</div>
          <div css={quillWrapperStyle}>
            <div css={editorStyle} ref={quillElement} />
          </div>
        </form>
      </div>
      <div css={buttonWrapStyle}>
        <button css={buttonStyle} onClick={onSubmit}>
          Posting
        </button>
        <button css={buttonStyle} onClick={onCancle}>
          Cancle
        </button>
      </div>
    </>
  )
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
    border: 1px solid #9c9c9c;
    width: 95%;
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