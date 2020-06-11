import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Box } from 'rebass'
import { makeLabel } from '../../utils/StringUtils'

const StyledInput = styled.input`
  padding: 10px;
`

const StyledLabel = styled.label`
  color: #696969;
  font-size: 10px;
`

export const Checkbox = ({
  htmlId,
  name,
  onChange,
  label,
  value,
  error,
  generateLabel = true,
  ...rest

}) => {
  const formattedLabel = label 
    ? label 
    : generateLabel 
      ? makeLabel(name) 
      : null

  return (
    <Flex flexDirection="column">
      <Box>
        {formattedLabel && <StyledLabel>{formattedLabel}</StyledLabel>}
      </Box>
      <Box flex="1">
        <StyledInput
          id={htmlId}
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </Box>
    </Flex>
  )
}

Checkbox.propTypes = {
  variant: PropTypes.string,
  htmlId: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  generateLabel: PropTypes.bool
}