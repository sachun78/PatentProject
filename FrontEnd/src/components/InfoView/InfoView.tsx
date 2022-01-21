import { css } from '@emotion/react'
import InfoViewSection from './InfoViewSection'
import InfoViewCard from './InfoViewCard'

export type InfoViewProps = {}

function InfoView({}: InfoViewProps) {
  return <div css={wrapper}>
    <InfoViewSection title='Account'>
      <InfoViewCard.Item title='Email' type={'email'} email='ryan4321@naver.com' />
      <InfoViewCard.Item title='Username' type={'username'} username='양희찬' />
      <InfoViewCard.Item title='Photo' type={'photo'} username='양희찬' editable />
    </InfoViewSection>
    <InfoViewSection title='Belonging'>
      <InfoViewCard.Item title='Company' type={'text'} description={'특허법인'} />
      <InfoViewCard.Item title='Department' type={'text'} description={'~~~'} />
      <InfoViewCard.Item title='Position' type={'text'} description={'~~~'} />
      <InfoViewCard.Item title='Field' type={'field'} fields={['IT/Network', 'IT/Computer', 'Construct/Apart']}/>
      <InfoViewCard.Item title='Country' type={'country'} />
    </InfoViewSection>
    <InfoViewSection title='Additional'>
      <InfoViewCard.Item title='Prev Career' type={'career'}/>
    </InfoViewSection>
  </div>
}

const wrapper = css`
  max-width: 90rem;
  padding-bottom: 2rem;
`

export default InfoView
