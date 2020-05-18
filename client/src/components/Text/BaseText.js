import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

export const BaseText = props => <Text {...props}>{props.children}</Text>

BaseText.propTypes = {
  children: PropTypes.node.isRequired
}
