import React from 'react'
import { Flex, Box } from 'rebass'
import { ProductionCalendar } from '../Calendar'
import { Financials } from '../Financials'
import { TaskList } from '../TaskList'

export const Admin = () => (
  <Flex>
    <Box width={[1, 1, 3/4]}>
      <ProductionCalendar />
    </Box>
    <Box width={[1, 1, 1/4]} p={3}>
      <Flex flexDirection="column">
        <Box>
          <Financials />
        </Box>
        <Box>
          <TaskList />
        </Box>
      </Flex>
    </Box>
  </Flex>
)