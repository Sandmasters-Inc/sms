import React from 'react'
import { Flex, Box } from 'rebass/styled-components'
import styled from 'styled-components'
import { Text } from '../Text'

export const TaskList = props => {
  const Wrapper = styled(Box)`
    margin: 5px 0;
  `
  const List = styled.ol`
    padding-left: 20px;
    margin-top: 0;
  `
  const tasks = [
    'Call back customer Joe',
    'Write up an estimate for customer Betty',
    'Pick up supplies from Bliffert',
    'Get stuff done',
    'Give random bonus to web developer'
  ]

  return (
    <Flex flexDirection="column">
      <Text as='h3'>Top Tasks</Text>
      <List>
      {
        tasks.map((task, i) => (
          <Wrapper key={i} as="li">
            <Text>{task}</Text>
          </Wrapper>
        ))
      }
      </List>
    </Flex>
  )
}