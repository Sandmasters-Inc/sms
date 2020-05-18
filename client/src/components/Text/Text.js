import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { BaseText } from './BaseText'

// const StyledText = styled(BaseText)`
//   ${props => props.theme.variants.text[props.variant || 'primary']};
// `

const StyledText = styled(BaseText)``

export const Text = props => <StyledText {...props} />

Text.propTypes = {
  variant: PropTypes.string
}
