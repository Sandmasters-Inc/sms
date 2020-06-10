import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 500px;
`

export const PageControls = ({ children }) => {
  return (
    <Content>{ children }</Content>
  )
}

