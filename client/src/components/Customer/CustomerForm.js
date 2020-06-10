import React, { useState } from 'react'
import { Button } from '../Button'
import { TextInput } from '../Inputs'
import { PageContent, PageControls } from '../Page'
import { capitalize, separate } from '../../utils/StringUtils'
import styled from 'styled-components'

export const CustomerForm = ({ customer, formTitle, onComplete }) => {
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

  const makeInput = (name, field, type="text") => {
    let formattedName = capitalize(name)
    formattedName = separate(formattedName)

    return (
      <TextInput
        type={type}
        name={name}
        label={formattedName}
        value={field}
        onChange={e => onChange(e)}
      />
    )
  }

  return (
    <PageContent>
      <h1>{formTitle}</h1>
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
      {makeInput("useMeAsReference", useMeAsReference, "checkbox")}
      <PageControls>
        <Button onClick={() => onComplete(customerData)}>Submit</Button>
      </PageControls>
    </PageContent>
  )
}