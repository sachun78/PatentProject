import React from 'react'
import styled from '@emotion/styled'

export type PolicyViewerProps = {
  type: 'privacy' | 'terms'
}

function PolicyViewer({ type }: PolicyViewerProps) {
  return <Block>tt{/*<MarkdownRender markdown={data[type]} />*/}</Block>
}

const Block = styled.div`
  margin-top: 3rem;
`

export default PolicyViewer
