import React from 'react'
import { Text } from './Text'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledText = styled(Text)`
  color: ${props => props.negative ? 'red': 'green'};
`

const format = number => {
  return number.toLocaleString('us-US', { style: 'currency', currency: 'USD' })
}

export const MoneyText = ({children, ...rest}) => 
  <StyledText {...rest}>{format(children)}</StyledText>

MoneyText.propTypes = {
  children: PropTypes.node.isRequired,
  negative: PropTypes.bool
}

MoneyText.defaultProps = {
  negative: false
}