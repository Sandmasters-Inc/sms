import React from 'react'
import PropTypes from 'prop-types'
import { ButtonBase } from './ButtonBase'
import styled from 'styled-components'

// const StyledButton = styled(ButtonBase)`
//   ${props => props.theme.variants.button[props.variant]};
// `
const StyledButton = styled(ButtonBase)`
  padding: 16px;
  border: solid 1px #2C3E50;
  border-radius: 3px;
  color: #fff;
  background-color: #2C3E50;
`

export const Button = props => <StyledButton {...props} />

Button.propTypes = {
  variant: PropTypes.string
}
