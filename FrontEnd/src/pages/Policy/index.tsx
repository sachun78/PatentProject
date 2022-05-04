import { Navigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import HorizontalTab from 'components/HorizontalTab'
import PolicyViewer from '../../components/policy/PolicyViewer'

const PolicyTemplate = styled.div`
  main {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: 768px;
    padding-bottom: 5rem;
  }
`

export type PolicyProps = {}

function Policy({}: PolicyProps) {
  const { type } = useParams()
  console.log(type)

  if (!type || !(type === 'privacy' || type === 'terms')) {
    return <Navigate to="/policy/privacy" />
  }
  return (
    <PolicyTemplate>
      <main>
        <HorizontalTab activeTab={type} tabWidth={12}>
          <HorizontalTab.TabItem to="/policy/terms" name="terms" text="Terms" />
          <HorizontalTab.TabItem to="/policy/privacy" name="privacy" text="Privacy" />
        </HorizontalTab>
        <PolicyViewer type={type} />
      </main>
      {!type && <Navigate to="/policy/privacy" />}
    </PolicyTemplate>
  )
}

export default Policy
