import React, { useState } from 'react'
import { Button } from '../Button'
import { TextInput } from '../Inputs'
import { capitalize, separate } from '../../utils/StringUtils'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 500px;
`

export const CustomerForm = ({ customer, onComplete }) => {
  const [customerData, setCustomerData] = useState(() => {
    return customer ? 
    {
      name: customer.name,
      firstName: customer.lastName,
      lastName: customer.lastName,
      company: customer.company,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
      businessType: customer.businessType,
      phoneNumbers: customer.phoneNumbers,
      email: customer.email,
      referredBy: customer.referredBy,
      adSource: customer.adSource,
      useMeAsReference: customer.useMeAsReference
    } :
    {
      name: '',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      businessType: '',
      // phoneNumbers: [],
      phoneNumbers: '',
      email: '',
      referredBy: '',
      adSource: '',
      useMeAsReference: false
    }
  })

  const { 
    name, 
    firstName, 
    lastName, 
    company, 
    address, 
    city,
    state, 
    zip, 
    businessType, 
    phoneNumbers, 
    email, 
    referredBy, 
    adSource, 
    useMeAsReference
  } = customerData

  const onChange = e => {
    const { name, value } = e.target
    setCustomerData({
      ...customerData,
      [name]: value
    })
  }

  const makeInput = (name, field) => {
    let formattedName = capitalize(name)
    formattedName = separate(formattedName)

    return (
      <TextInput
        name={name}
        label={formattedName}
        value={field}
        onChange={e => onChange(e)}
      />
    )
  }

  return (
    <Container>
      {makeInput("name", name)}
      {makeInput("firstName", firstName)}
      {makeInput("lastName", lastName)}
      {makeInput("company", company)}
      {makeInput("address", address)}
      {makeInput("city", city)}
      {makeInput("state", state)}
      {makeInput("zip", zip)}
      {makeInput("businessType", businessType)}
      {makeInput("phoneNumbers", phoneNumbers)}
      {makeInput("email", email)}
      {makeInput("referredBy", referredBy)}
      {makeInput("adSource", adSource)}
      {makeInput("useMeAsReference", useMeAsReference)}
      <ButtonContainer>
        <Button onClick={() => onComplete(customerData)}>Submit</Button>
      </ButtonContainer>
    </Container>
  )
}