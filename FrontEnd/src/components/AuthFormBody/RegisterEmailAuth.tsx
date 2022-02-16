import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { checkCode } from '../../lib/api/auth/sendmail'
import { useNavigate } from 'react-router-dom'
import { useUserState } from '../../atoms/authState'
import { useGlobalDialogActions } from '../../atoms/globalDialogState'

export type RegisterFormEmailAuthProps = {
  code: string | null
}

function RegisterEmailAuth({ code }: RegisterFormEmailAuthProps) {
  const navigate = useNavigate()
  const [user] = useUserState()
  const { open } = useGlobalDialogActions()

  const alamError = () => {
    open({
      title: 'Error',
      message: 'Error Occurs on Email Authentication',
      onConfirm: () => {
        navigate('/login')
      },
      showCancel: false,
      confirmText: 'OK'
    })
  }

  useEffect(() => {
    if (!code) return
    const fetchCode = async () => {
      return await checkCode(code)
    }
    let timer: NodeJS.Timeout
    fetchCode()
      .then(() => {
        console.log('fetch code success')
        if (user) {
          timer = setTimeout(() => {
            navigate('/')
          }, 3000)
        } else {
          timer = setTimeout(() => {
            navigate('/login')
          }, 3000)
        }
      })
      .catch((e) => {
        console.error(e)
        alamError()
      })
    return () => clearTimeout(timer)
  }, [code, navigate])

  return <div css={wrapper}>
    <h2 className='title'>Verified Code</h2>
    <h4>Checked Your ID, please Login Your Account</h4>
  </div>
}

const wrapper = css`
  height: 0;

  h4 {
    height: 4rem;
  }
`

export default RegisterEmailAuth
