import React from 'react'
import { Button, IconButton, LinkButton } from '../'
import { Strings } from './Strings'
import { UnknownTypeException } from '../../../Exception'

export class ButtonFactory {
  static create(data) {
    let { type } = Strings

    switch (data.type) {
      case type.button:
        return (
          <Button variant={data.variant} onClick={data.callback}>
            {data.text}
          </Button>
        )

      case type.iconButton:
        return (
          <IconButton
            variant={data.variant}
            onClick={data.callback}
            icon={data.icon}
          />
        )

      case type.linkButton:
        return (
          <LinkButton variant={data.variant} onClick={data.callback}>
            {data.text}
          </LinkButton>
        )
      default:
        throw new UnknownTypeException(`${data.type} is not a valid Button.`)
    }
  }

  static tryCreate(data) {
    try {
      return ButtonFactory.create(data)
    } catch (error) {
      //TODO: replace with logger
      console.log('%c' + error.toString(), 'color: red')
      return null
    }
  }
}
