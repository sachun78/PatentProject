import { css } from '@emotion/react'
import IconControl from 'components/IconControl'
import { editPost } from 'lib/api/post/editPost'
import { getPost } from 'lib/api/post/getPost'
import { postImgUpload } from 'lib/api/post/postImgUpload'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_PATH } from 'lib/api/client'

function PostEdit() {
  const qc = useQueryClient()
  const [image, setImage] = useState<string[]>([])
  const quillElement = useRef<any>(null)
  const quillInstance = useRef<any>(null)
  const navigate = useNavigate()

  const { id } = useParams()
  const { data: post, isLoading } = useQuery(['post', id], getPost, {
    retry: false,
  })

  const [body, setBody] = useState('')

  const postEditMut = useMutation(editPost, {
    onSuccess: () => {
      qc.invalidateQueries(['posts'])
      qc.invalidateQueries(['post', id])
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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      const innerImage = quillInstance.current
        .getContents()
        .ops.filter((insert: any) => insert.insert['image'] !== undefined)
      const newImage = image

      innerImage.map(async (insert: any) => {
        setImage([...image, insert.insert['image']])
        newImage.push(insert.insert['image'])
      })

      if (!body.trim()) {
        toast.error('Please enter the contents', {
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 3000,
        })
        return
      }

      const imgRegex = /<p><br><\/p><p><img[^>]*src=["']?([^>"']+)["']?[^/>]*><\/p>/g

      postEditMut.mutate([
        {
          contents: body.replace(imgRegex, ''),
          images: newImage,
        },
        id!!,
      ])
    },
    [body, id, image, postEditMut]
  )

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const makeUUID = (fileName: string) => {
    function s4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (
      s4() +
      s4() +
      s4() +
      s4() +
      s4() +
      s4() +
      s4() +
      s4() +
      fileName.substring(fileName.indexOf('.'), fileName.length + 1)
    )
  }

  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    const ops = quillInstance.current.getContents().ops
    const innerImage = ops.filter((insert: any) => insert.insert['image'] !== undefined)
    const range = quillInstance.current.getSelection(true)

    if (innerImage.length > 3) {
      toast.success('There are up to four image attachments.', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 2000,
      })
      return
    }

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input: any = document.createElement('input')
    // 속성 써주기
    input.setAttribute('type', 'file')
    input.setAttribute('accept', '.png, .jpeg, .jpg, .bmp')
    input.click()

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
      const file = input.files[0]

      const formData = new FormData()
      formData.append('post_img', file, makeUUID(file.name))

      postImgUpload(formData).then((res) => {
        quillInstance.current.root.innerHTML =
          quillInstance.current.root.innerHTML +
          `<img src='${API_PATH}static/${res.fileName}' crossorigin='anonymous' width='500px' height='300px' >`

        setTimeout(() => quillInstance.current.setSelection(range.index + 2), 0)
      })
    })
  }

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: ' Please enter the contents...',
      modules: {
        toolbar: {
          container: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [false, 'center', 'right', 'justify'] }],
            ['blockquote', 'code-block', 'link', 'image'],
          ],
          handlers: {
            image: imageHandler,
          },
        },
      },
    })

    const quill = quillInstance.current

    if (post) {
      post.images.map(
        (img: any) => (quill.root.innerHTML = quill.root.innerHTML + `<img src='${img}' crossOrigin='anonymous' />`)
      )
      quill.root.innerHTML = quill.root.innerHTML + post.contents

      quill.on('text-change', () => {
        setBody(quill.root.innerHTML)
      })
    }
  }, [post])

  if (!post) return <div></div>

  return (
    <>
      <div css={postWriteStyle}>
        <form onSubmit={onSubmit} encType="multipart/form-data" style={{ height: '100%', marginBottom: '1.875rem' }}>
          <div css={headStyle}>
            <IconControl name={'write'} style={{ padding: '0 0.375rem 0 0' }} />
            Edit Post
          </div>
          <div css={quillWrapperStyle}>
            <div css={editorStyle} ref={quillElement} />
          </div>
        </form>
        <div css={buttonWrapStyle}>
          <button css={buttonStyle} onClick={onCancel} style={{ background: '#9C9C9C' }}>
            Cancel
          </button>
          <button css={buttonStyle} onClick={onSubmit} style={{ background: '#910457' }}>
            Edit
          </button>
        </div>
      </div>
    </>
  )
}

export default PostEdit

const headStyle = css`
  display: flex;
  font: 800 18px NanumSquareOTF;
  align-items: center;
  padding: 1.875rem 0 1.875rem 1.875rem;
  color: #333333;
`

const editorStyle = css`
  max-height: 26.125rem;
  background: #ffffff !important;
`

const quillWrapperStyle = css`
  height: 32.5rem;

  .ql-container {
    border: none !important;
  }

  .ql-toolbar {
    background: #f2f2f2;
    border: none !important;
    padding: 0.5rem 0 0.5rem 1rem !important;
  }

  .ql-editor {
    font: 15px NanumSquareOTF;
    line-height: 1.5;
    margin: 1.875rem;
    padding: 0;
    color: #6c6c6c;
  }

  .ql-editor.ql-blank::before {
    font: 15px NanumSquareOTF;
    color: #d9d9d9;
  }
`
const postWriteStyle = css`
  width: 54.375rem;
  height: 37.5rem;
  margin-bottom: 1.6rem;
  align-items: flex-start;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 0.7rem;
  opacity: 0.8;
  position: relative;
  background: #ffffff;
`
const buttonWrapStyle = css`
  display: flex;
  justify-content: center;

  button + button {
    margin-left: 1.25rem;
  }
`

const buttonStyle = css`
  border: none;
  border-radius: 999px;
  width: 9.375rem;
  height: 1.75rem;
  font: 14px NanumSquareOTF;
  font-weight: 100;
  color: white;
  cursor: pointer;
`
