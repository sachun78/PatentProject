import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostView from '../../components/PostView'
import SponsorView from '../../components/SponsorView'
import { useLoginValue } from '../../hooks/useLogin'
type HomeProps = {}

function Home({}: HomeProps) {
  const navigate = useNavigate()
  const Login = useLoginValue()

  useEffect(() => {
    if (!Login?.isloggedIn) {
      console.log('isloggedIn is false')
      navigate('/login')
    }
  }, [Login])

  return (
    <div css={baseStyle}>
      <PostView />
      <SponsorView />
    </div>
  )
}

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 6rem);
`

export default Home
