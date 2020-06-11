import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, Checkbox, InputType } from './'
import { UnknownTypeException } from '../Exception'

export const InputFactory = ({ inputType=InputType.textInput, ...rest }) => {
  switch (inputType) {
    case InputType.textInput:
      return <TextInput {...rest} />
    case InputType.checkbox:
      return <Checkbox {...rest} />
  
    default:
      throw new UnknownTypeException(`${inputType} is not a valid Input.`)
  }
}

InputFactory.propTypes = {
  inputType: PropTypes.string,
  value: PropTypes.any.isRequired
}