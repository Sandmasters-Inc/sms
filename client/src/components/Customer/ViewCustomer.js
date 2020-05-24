import React from 'react'

export const ViewCustomer = ({ customer }) => {
  return (
    <div>
      <h1>{`Customer: ${customer.name}`}</h1>
      <div>{`Name: ${customer.name}`}</div>
      <div>{`First Name: ${customer.firstName}`}</div>
      <div>{`Last Name: ${customer.lastName}`}</div>
      <div>{`Company: ${customer.company}`}</div>
      <div>{`Address: ${customer.address}`}</div>
      <div>{`City: ${customer.city}`}</div>
      <div>{`State: ${customer.state}`}</div>
      <div>{`Zip: ${customer.zip}`}</div>
      <div>{`Business Type: ${customer.businessType}`}</div>
      <div>{`Phone Numbers: ${customer.phoneNumbers}`}</div>
      <div>{`Email: ${customer.email}`}</div>
      <div>{`Referred By: ${customer.referredBy}`}</div>
      <div>{`Ad Source: ${customer.adSource}`}</div>
      <div>{`Use Me As Reference: ${customer.useMeAsReference}`}</div>
    </div>
  )
}