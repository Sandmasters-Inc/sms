import React from 'react'
import { Flex, Box } from 'rebass/styled-components'
import styled from 'styled-components'
import { Text } from '../Text'

const Wrapper = styled(Box)`
  margin: 5px 0 0 0;
`

const renderList = () => (
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
)

export const Sales = () => (
  <Flex>
    <Box width={[1, 1, 3/4]}>
      <Text as='h3'>Site Inspection Calendar</Text>
    </Box>
    <Box width={[1, 1, 1/4]} p={3}>
      <Flex flexDirection="column">
        <Wrapper>
          <Text as='h3'>Job Proposals</Text>
          { renderList() }
        </Wrapper>
        <Wrapper>
          <Text as='h3'>Jobs In Progress</Text>
          { renderList() }
        </Wrapper>
        <Wrapper>
          <Text as='h3'>Completed Jobs</Text>
          { renderList() }
        </Wrapper>
        <Wrapper>
          <Text as='h3'>Site Inspection Follow Up</Text>
          { renderList() }
        </Wrapper>
      </Flex>
    </Box>
  </Flex>
)