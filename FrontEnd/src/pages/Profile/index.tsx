import InfoView from '../../components/InfoView'
import { infoStyle, titleStyle, wrapper } from './styles'

export type ProfileProps = {}

function Profile({}: ProfileProps) {

  return <div css={wrapper}>
    <div css={titleStyle}>
      <div className='line'>
        <h2>Profile</h2>
      </div>
    </div>
    <div css={infoStyle}><InfoView /></div>
  </div>
}

export default Profile
