import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Box } from 'rebass'
import { Text } from '../Text'

// const StyledInput = styled.input`
//   ${props => props.theme.variants.textInput[props.variant || 'primary']};
// `

const StyledInput = styled.input`
  padding: 10px;
`

const ErrorContainer = styled.div`
  position: relative;
`

const StyledText = styled(Text)`
  position: absolute;
  bottom: -3em;
`

export const TextInput = ({
  htmlId,
  name,
  type = 'text',
  onChange,
  placeholder,
  value,
  error,
  children,
  ...rest
}) => (
  <Flex flexDirection="column">
    <Flex>
      <Box flex="1">
        <StyledInput
          id={htmlId}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </Box>
      <Flex flexDirection="column" justifyContent="center">
        {children}
      </Flex>
    </Flex>
    <ErrorContainer>
      {error && <StyledText variant="error">{error}</StyledText>}
    </ErrorContainer>
  </Flex>
)

TextInput.propTypes = {
  variant: PropTypes.string,
  htmlId: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  children: PropTypes.node
}
