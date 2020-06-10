import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`

export const PageContent = ({ children }) => {
  return (
    <Content>{ children }</Content>
  )
}

