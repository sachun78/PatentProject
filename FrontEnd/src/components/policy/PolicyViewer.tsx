import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
import data from './policyData'

export type PolicyViewerProps = {
  type: 'privacy' | 'terms'
}

function PolicyViewer({ type }: PolicyViewerProps) {
  return (
    <Block>
      <ReactMarkdown>{data[type]}</ReactMarkdown>
    </Block>
  )
}

const Block = styled.div`
  margin-top: 3rem;
  line-height: 1.7;
  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 1rem;
    margin-top: 1rem;
    line-height: 1.5;
  }

  p {
    margin-top: 1.125rem;
  }

  p + p {
    margin-top: 0;
  }

  ul,
  ol {
    margin-top: 1.125rem;
    margin-bottom: 1.125rem;
    padding-left: 2.5rem;
  }
`

export default PolicyViewer
