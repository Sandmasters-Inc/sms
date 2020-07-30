import React from 'react'
import { Flex, Box } from 'rebass/styled-components'
import styled from 'styled-components'
import { Text, MoneyText } from '../Text'

export const Financials = () => {
  const balance = 50000;
  const comingIn = 13000.5;
  const goingOut = 10000;
  const dailyDeposits = 3000.33;

  const Wrapper = styled(Box)`
    margin: 5px 0;
  `

  return (
    <Flex flexDirection="column">
      <Text as='h3'>Financials</Text>
      <Wrapper>
        <Text>Balance</Text>
        <MoneyText>{balance}</MoneyText>
      </Wrapper>
      <Wrapper>
        <Text>Coming In</Text>
        <MoneyText>{comingIn}</MoneyText>
      </Wrapper>
      <Wrapper>
        <Text>Going Out</Text>
        <MoneyText negative={true}>{goingOut}</MoneyText>
      </Wrapper>
      <Wrapper>
        <Text>Daily Deposits</Text>
        <MoneyText>{dailyDeposits}</MoneyText>
      </Wrapper>
    </Flex>
  )
}