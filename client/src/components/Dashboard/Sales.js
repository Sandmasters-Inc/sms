import React from 'react'
import { Flex, Box } from 'rebass/styled-components'

export const Sales = () => (
  <Flex>
    <Box width={[1, 1, 3/4]}>
      Site Inspection Calendar
    </Box>
    <Box width={[1, 1, 1/4]} p={3}>
      <Flex flexDirection="column">
        <Box>
          Job Proposals
        </Box>
        <Box>
          Jobs In Progress
        </Box>
        <Box>
          Completed Jobs
        </Box>
        <Box>
          Site Inspection Follow Up
        </Box>
      </Flex>
    </Box>
  </Flex>
)