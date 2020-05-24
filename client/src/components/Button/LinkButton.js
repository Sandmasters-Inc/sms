import React from 'react'
import PropTypes from 'prop-types'
import { ButtonBase } from './ButtonBase'
import styled from 'styled-components'

// const StyledButton = styled(ButtonBase)`
//   ${props => props.theme.variants.linkButton[props.variant || 'primary']};
// `
const StyledButton = styled(ButtonBase)``

export const LinkButton = props => <StyledButton {...props} />

LinkButton.propTypes = {
  variant: PropTypes.string
}
