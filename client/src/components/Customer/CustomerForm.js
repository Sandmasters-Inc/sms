import React, { useState } from 'react'
import { Button } from '../Button'
import { TextInput, Checkbox } from '../Inputs'
import { PageContent, PageControls } from '../Page'

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

  return (
    <PageContent>
      <h1>{formTitle}</h1>
      <TextInput name="name" value={name} onChange={e => onChange(e)} />
      <TextInput name="firstName" value={firstName} onChange={e => onChange(e)} />
      <TextInput name="lastName" value={lastName} onChange={e => onChange(e)} />
      <TextInput name="company" value={company} onChange={e => onChange(e)} />
      <TextInput name="address" value={address} onChange={e => onChange(e)} />
      <TextInput name="city" value={city} onChange={e => onChange(e)} />
      <TextInput name="state" value={state} onChange={e => onChange(e)} />
      <TextInput name="zip" value={zip} onChange={e => onChange(e)} />
      <TextInput name="businessType" value={businessType} onChange={e => onChange(e)} />
      <TextInput name="phoneNumbers" value={phoneNumbers} onChange={e => onChange(e)} />
      <TextInput name="email" value={email} onChange={e => onChange(e)} />
      <TextInput name="referredBy" value={referredBy} onChange={e => onChange(e)} />
      <TextInput name="adSource" value={adSource} onChange={e => onChange(e)} />
      <Checkbox name="useMeAsReference" value={useMeAsReference} onChange={e => onChange(e)} />
  
      <PageControls>
        <Button onClick={() => onComplete(customerData)}>Submit</Button>
      </PageControls>
    </PageContent>
  )
}